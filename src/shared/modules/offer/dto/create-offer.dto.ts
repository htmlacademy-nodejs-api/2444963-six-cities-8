import { Coordinates } from '../../../types/coordinates.type.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public createdData: Date;
  public city: string;
  public previewImage: string;
  public images: string[];
  public premium: boolean;
  public rating: number;
  public bedrooms: number;
  public guests: number;
  public amenities: string[];
  public price: number;
  public coordinates: Coordinates;
  public userId: string;
}

