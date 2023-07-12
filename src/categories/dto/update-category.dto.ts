import { Optional } from '@nestjs/common';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional()
  @Optional()
  @IsString()
  des_1: string;

  @ApiPropertyOptional()
  @Optional()
  @IsString()
  keywords: string;

  @ApiPropertyOptional()
  @Optional()
  @IsString()
  des_2: string;
}
