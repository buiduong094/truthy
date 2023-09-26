import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductImageDto } from './dto/create-productimage.dto';
import { UpdateProductImageDto } from './dto/update-productimage.dto';
import { ProductImagesRepository } from './productimages.repository';
import { ProductImage } from './serializer/productimage.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { ProductImageSearchFilterDto } from './dto/productimages.searchfilter.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImagesRepository)
    private readonly repository: ProductImagesRepository
  ) {}

  create(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
    return this.repository.createEntity(createProductImageDto);
  }
  /**
   * Get all ProductImage templates paginated list
   * @param filter
   */
  findAll(
    filter: ProductImageSearchFilterDto
  ): Promise<Pagination<ProductImage>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'product_id', 'attachment_id']
    );
  }

  findOne(id: number): Promise<ProductImage> {
    return this.repository.get(id);
  }

  /**
   * Update ProductImage by id
   * @param id
   * @param updateProductImageDto
   */
  async update(
    id: number,
    updateProductImageDto: UpdateProductImageDto
  ): Promise<ProductImage> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      product_id: updateProductImageDto.product_id,
      attachment_id: updateProductImageDto.attachment_id
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'product_id',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateProductImageDto
    });
  }

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
