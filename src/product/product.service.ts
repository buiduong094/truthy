import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, ObjectLiteral } from 'typeorm';

import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductRepository } from 'src/product/product.repository';
import { CommonServiceInterface } from 'src/common/interfaces/common-service.interface';
import { Product } from 'src/product/serializer/product.serializer';
import { ProductsSearchFilterDto } from 'src/product/dto/products-search-filter.dto';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { Pagination } from 'src/paginate';

@Injectable()
export class ProductService
  implements CommonServiceInterface<Product>
{
  constructor(
    @InjectRepository(ProductRepository)
    private readonly repository: ProductRepository
  ) {}

  /**
   * convert string to slug
   * @param text
   */
  slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  /**
   * Find Email Template By Slug
   * @param slug
   */
  async findBySlug(slug) {
    return await this.repository.findOne({
      select: ['name'],
      where: {
        name
      }
    });
  }

  /**
   * Create new Email Template
   * @param createProductDto
   */
  create(
    createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.repository.createEntity({
      ...createProductDto,
      name: this.slugify(createProductDto.name)
    });
  }

  /**
   * Get all email templates paginated list
   * @param filter
   */
  findAll(
    filter: ProductsSearchFilterDto
  ): Promise<Pagination<Product>> {
    return this.repository.paginate(
      filter,
      [],
      ['name']
    );
  }

  /**
   * Find Email Template By Id
   * @param id
   */
  findOne(id: number): Promise<Product> {
    return this.repository.get(id);
  }

  /**
   * Update Email Template by id
   * @param id
   * @param updateProductDto
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      name: updateProductDto.name
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'name',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateProductDto,
      name: this.slugify(updateProductDto.name)
    });
  }

  /**
   * Remove Email Template By id
   * @param id
   */
  async remove(id: number): Promise<void> {
    const template = await this.findOne(id);
    if (template.isDefault) {
      throw new ForbiddenException(
        ExceptionTitleList.DeleteDefaultError,
        StatusCodesList.DeleteDefaultError
      );
    }
    await this.repository.delete({ id });
  }
}
