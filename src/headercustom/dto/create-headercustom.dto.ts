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

export class CreateHeaderCustomDto {
  //
  @IsString()
  name: string;
  @IsString()
  orderValue: string;
  @IsString()
  parent_id: string;
  @IsString()
  url: string;
  @IsString()
  is_productlist: string;
  @IsString()
  is_display: string;
  @IsString()
  image_id: string;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
}
