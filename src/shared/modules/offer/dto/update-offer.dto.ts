import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDate()
  public udateddData?: Date;

  @IsString()
  @IsOptional()
  public previewImage?: string;

  @IsString({each: true})
  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public images?: string[];

  @IsOptional()
  @IsBoolean()
  public premium?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: CreateOfferValidationMessage.rating.minLength })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxLength })
  public rating?: number;

  @IsString({each: true})
  @IsOptional()
  @IsString({each: true})
  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public amenities?: string[];

  @IsOptional()
  @IsNumber()
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;
}
