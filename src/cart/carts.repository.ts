import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CartEntity } from './entities/cart.entity';
import { Cart } from './serializer/cart.serializer';

@EntityRepository(CartEntity)
export class CartsRepository extends BaseRepository<CartEntity, Cart> {
  transform(model: CartEntity, transformOption = {}): Cart {
    return plainToClass(
      Cart,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(models: CartEntity[], transformOption = {}): Cart[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
