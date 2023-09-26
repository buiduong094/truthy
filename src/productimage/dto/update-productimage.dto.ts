import { PartialType } from '@nestjs/swagger';
import { CreateProductImageDto } from './create-productimage.dto';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
