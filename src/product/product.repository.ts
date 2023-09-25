import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Product } from 'src/product/serializer/product.serializer';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<
  ProductEntity,
  Product
> {
  transform(model: ProductEntity, transformOption = {}): Product {
    return plainToClass(
      Product,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: ProductEntity[],
    transformOption = {}
  ): Product[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
