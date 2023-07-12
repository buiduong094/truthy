import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Category } from 'src/categories/serializer/category.serializer';

@EntityRepository(CategoryEntity)
export class CategoriesRepository extends BaseRepository<
  CategoryEntity,
  Category
> {
  transform(model: CategoryEntity, transformOption = {}): Category {
    return plainToClass(
      Category,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(models: CategoryEntity[], transformOption = {}): Category[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
