import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
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
      favorite,
      rating,
      bedrooms,
      guests,
      amenities,
      autor,
      price,
      coordinates
    ] = line.split('\t');

    return {
      name,
      description,
      createdData: new Date(createdDate),
      city,
      previewImage,
      images: this.parseImages(images),
      premium: Boolean(premium),
      favorite: Boolean(favorite),
      rating: Number(rating),
      bedrooms: Number(bedrooms),
      guests: Number(guests),
      amenities: this.parseImages(amenities),
      autor,
      price: Number(price),
      coordinates: {latatude: Number(coordinates.split(',')[0]), longitude: Number(coordinates.split(',')[1])}
    };
  }

  private parseImages(categoriesString: string): string [] {
    return categoriesString.split('  ');
  }


  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
