import { IsOptional, IsString, Length } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath?: string;

  @IsOptional()
  @IsString()
  public typeUser?: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name?: string;
}
