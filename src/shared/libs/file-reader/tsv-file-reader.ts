import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer} from '../../types/index.js';
import { TSV_SEPARATOR } from '../../constants.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      name,
      description,
      createdDate,
      city,
      previewImage,
      images,
      premium,
      price,
      rating,
      bedrooms,
      guests,
      amenities,
      author,
      coordinates
    ] = line.split('\t');

    const parseAuthor = author.split(TSV_SEPARATOR);
    const lat = Number(coordinates.split(TSV_SEPARATOR)[0]);
    const lon = Number(coordinates.split(TSV_SEPARATOR)[1]);

    return {
      name,
      description,
      createdData: new Date(createdDate),
      city,
      previewImage,
      images: images.split(TSV_SEPARATOR),
      premium: premium.toLocaleLowerCase() === 'true',
      rating: Number(rating),
      bedrooms: Number(bedrooms),
      guests: Number(guests),
      amenities: amenities.split(TSV_SEPARATOR),
      author: {
        name: parseAuthor[0],
        avatarPath: parseAuthor[1],
        email: parseAuthor[2],
        typeUser: parseAuthor[3],
      },
      price: Number(price),
      coordinates: {latitude: lat, longitude: lon}
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }
    this.emit('end', importedRowCount);
  }
}
