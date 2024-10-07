import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer} from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  // name,
  // describe,
  // createData,
  // city,
  // previewImage,
  // images,
  // premium,
  // price,
  // rating,
  // bedrooms,
  // guests,
  // amenities,
  // autor,
  // coordinates,
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
      autor,
      coordinates
    ] = line.split('\t');
    const parseAutor = autor.split('|');
    return {
      name,
      description,
      createdData: new Date(createdDate),
      city,
      previewImage,
      images: images.split('|'),
      premium: premium.toLocaleLowerCase() === 'true',
      rating: Number(rating),
      bedrooms: Number(bedrooms),
      guests: Number(guests),
      amenities: amenities.split('|'),
      autor: {
        name: parseAutor[0],
        avatarPath: parseAutor[1],
        email: parseAutor[2],
        typeUser: parseAutor[3],
      },
      price: Number(price),
      coordinates: {latatude: Number(coordinates.split(',')[0]), longitude: Number(coordinates.split(',')[1])}
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
