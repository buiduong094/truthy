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

export class CreateProductImageDto {
  //
  @IsNumber()
  product_id: number;
  @IsString()
  attachment_id: string;
}
