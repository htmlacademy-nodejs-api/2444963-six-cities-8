import { IsArray, IsDate, IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDate()
  public udateddData?: Date;

  @IsOptional()
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public images?: string[];

  @IsOptional()
  public premium?: boolean;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minLength })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxLength })

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minLength })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxLength })
  public rating?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.minLength })
  public amenities?: string[];

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;
}
