import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';

export class CreateFileUploadCustomDto {
  //
  @IsString()
  name: string;
  @IsString()
  oldname: string;
  @IsString()
  product_id: string;
  @IsNumber()
  banner_order: number;
  @IsString()
  size: string;
  @IsString()
  type: string;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
}
