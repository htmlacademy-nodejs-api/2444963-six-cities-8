import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Cities } from '../../../types/city.enum.js';
import { Type } from 'class-transformer';

class CoordinatesDto {
  @IsNumber()
  @Min(-90, { message: 'Latitude must be between -90 and 90' })
  @Max(90, { message: 'Latitude must be between -90 and 90' })
  public latitude: number;

  @IsNumber()
  @Min(-180, { message: 'Longitude must be between -180 and 180' })
  @Max(180, { message: 'Longitude must be between -180 and 180' })
  public longitude: number;
}

export class CreateOfferDto {
  @IsString({message: CreateOfferValidationMessage.name.invalidFormat})
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name: string;

  @IsString()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsString()
  public offerType: string;

  @IsString()
  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: Cities;

  @IsString()
  public previewImage: string;

  @IsString({each: true})
  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public images: string[];

  @IsBoolean()
  public premium: boolean;

  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.rating.minLength })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxLength })
  public rating: number;

  @IsInt()
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minLength })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxLength })
  public bedrooms: number;

  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.guests.minLength })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxLength })
  public guests: number;

  @IsString({each: true})
  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public amenities: string[];

  @IsNumber()
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates: CoordinatesDto;

  public userId: string;
}

