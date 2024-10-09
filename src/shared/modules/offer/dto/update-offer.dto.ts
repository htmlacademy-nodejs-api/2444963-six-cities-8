import { Coordinates } from '../../../types/coordinates.type.js';

export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public udateddData?: Date;
  public city?: string;
  public previewImage?: string;
  public images?: string[];
  public premium?: boolean;
  public rating?: number;
  public bedrooms?: number;
  public guests?: number;
  public amenities?: string[];
  public price?: number;
  public coordinates?: Coordinates;
}
