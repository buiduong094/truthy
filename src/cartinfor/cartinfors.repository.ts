import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CartInforEntity } from './entities/cartinfor.entity';
import { CartInfor } from './serializer/cartinfor.serializer';

@EntityRepository(CartInforEntity)
export class CartInforsRepository extends BaseRepository<
  CartInforEntity,
  CartInfor
> {
  transform(model: CartInforEntity, transformOption = {}): CartInfor {
    return plainToClass(
      CartInfor,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(models: CartInforEntity[], transformOption = {}): CartInfor[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
