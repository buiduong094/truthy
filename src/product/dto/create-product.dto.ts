import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { ProductEntity } from 'src/product/entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'maxLength-{"ln":100,"count":100}'
  })
  @Validate(UniqueValidatorPipe, [ProductEntity], {
    message: 'already taken'
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  brand: string;
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  keywords: string;

  @IsOptional()
  @IsString()
  des_1: string;
  @IsOptional()
  @IsString()
  des_2: string;
  @IsOptional()
  @IsString()
  cover_id: string;

  @IsOptional()
  @IsBoolean()
  isHot: boolean;
  @IsOptional()
  @IsBoolean()
  isLike: boolean;
  @IsOptional()
  @IsBoolean()
  isNew: boolean;
}
