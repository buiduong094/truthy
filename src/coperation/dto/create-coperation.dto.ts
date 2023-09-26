import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';

export class CreateCoperationDto {
  //
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  images_id: string;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
  @IsString()
  lkey: string;

  @IsString()
  lval: string;
}
