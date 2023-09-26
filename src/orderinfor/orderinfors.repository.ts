import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { OrderInforEntity } from './entities/orderinfor.entity';
import { OrderInfor } from './serializer/orderinfor.serializer';

@EntityRepository(OrderInforEntity)
export class OrderInforsRepository extends BaseRepository<
  OrderInforEntity,
  OrderInfor
> {
  transform(model: OrderInforEntity, transformOption = {}): OrderInfor {
    return plainToClass(
      OrderInfor,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: OrderInforEntity[],
    transformOption = {}
  ): OrderInfor[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
