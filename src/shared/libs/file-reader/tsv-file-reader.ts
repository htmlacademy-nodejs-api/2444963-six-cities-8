import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Cities, Offer} from '../../types/index.js';
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
      offerType,
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

    const [userName, avatarPath, email, typeUser] = author.split(TSV_SEPARATOR);
    const [lat, lon] = coordinates.split(TSV_SEPARATOR);

    return {
      name,
      description,
      offerType,
      city: city as Cities,
      previewImage,
      images: images.split(TSV_SEPARATOR),
      premium: premium.toLocaleLowerCase() === 'true',
      rating: Number(rating),
      bedrooms: Number(bedrooms),
      guests: Number(guests),
      amenities: amenities.split(TSV_SEPARATOR),
      author: {
        name: userName,
        avatarPath,
        email,
        typeUser,
      },
      price: Number(price),
      coordinates: {latitude: Number(lat), longitude: Number(lon)}
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
