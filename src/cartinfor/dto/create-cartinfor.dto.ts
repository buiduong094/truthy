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

export class CreateCartInforDto {
  //
  @IsNumber()
  cart_id: number;
  @IsNumber()
  product_id: number;
  @IsNumber()
  quantity: number;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
  @IsString()
  des_3: string;
}
