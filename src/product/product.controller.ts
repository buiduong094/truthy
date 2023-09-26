import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Pagination } from 'src/paginate';
import { Product } from 'src/product/serializer/product.serializer';
import { ProductsSearchFilterDto } from 'src/product/dto/products-search-filter.dto';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';

@ApiTags('products')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Post()
  create(
    @Body()
    createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.ProductService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query()
    filter: ProductsSearchFilterDto
  ): Promise<Pagination<Product>> {
    return this.ProductService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<Product> {
    return this.ProductService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.ProductService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id')
    id: string
  ): Promise<void> {
    return this.ProductService.remove(+id);
  }
}
