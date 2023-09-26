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

export class CreateOrderInforDto {
  //
  @IsNumber()
  order_id: number;
  @IsNumber()
  product_id: number;
  @IsNumber()
  quantity: number;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
}
