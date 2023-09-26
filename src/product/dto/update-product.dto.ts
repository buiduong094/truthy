import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(
  CreateProductDto
) {
  @ApiPropertyOptional()
  @Optional()
  @IsString()
  name: string;
}
