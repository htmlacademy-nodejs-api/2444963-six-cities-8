import { IsArray, IsDate, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

import { Coordinates } from '../../../types/coordinates.type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Cities } from '../../../types/cities.type.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  public offerType: string;

  @IsDate()
  public createdData: Date; // зачем нам это поле если в базе данных есть поле createdAt ? ----------------------

  public city: Cities;

  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public images: string[];

  public premium: boolean;

  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minLength })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxLength })
  public rating: number;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minLength })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxLength })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guests.minLength })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxLength })
  public guests: number;

  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public amenities: string[];

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  public coordinates: Coordinates;

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId: string;
}

