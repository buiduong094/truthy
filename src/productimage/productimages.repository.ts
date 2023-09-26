import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { ProductImageEntity } from './entities/productimage.entity';
import { ProductImage } from './serializer/productimage.serializer';

@EntityRepository(ProductImageEntity)
export class ProductImagesRepository extends BaseRepository<
  ProductImageEntity,
  ProductImage
> {
  transform(model: ProductImageEntity, transformOption = {}): ProductImage {
    return plainToClass(
      ProductImage,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: ProductImageEntity[],
    transformOption = {}
  ): ProductImage[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
