import { ProductImagesService } from './productimages.service';
import { CreateProductImageDto } from './dto/create-productimage.dto';
import { UpdateProductImageDto } from './dto/update-productimage.dto';
import { ProductImage } from './serializer/productimage.serializer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Pagination } from 'src/paginate';
import { ProductImageSearchFilterDto } from './dto/productimages.searchfilter.dto';

@ApiTags('productimages')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('productimages')
export class ProductImagesController {
  constructor(private readonly productimagesService: ProductImagesService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateProductImageDto
  ): Promise<ProductImage> {
    return this.productimagesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: ProductImageSearchFilterDto
  ): Promise<Pagination<ProductImage>> {
    return this.productimagesService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<ProductImage> {
    return this.productimagesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto
  ): Promise<ProductImage> {
    return this.productimagesService.update(+id, updateProductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productimagesService.remove(+id);
  }
}
