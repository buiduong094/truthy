import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';

export class CreateCustomMessageDto {
  //
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsString()
  email: string;
  @IsString()
  message: string;
  @IsString()
  des_1: string;
  @IsString()
  status: string;
}
