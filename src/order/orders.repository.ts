import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { OrderEntity } from './entities/order.entity';
import { Order } from './serializer/order.serializer';

@EntityRepository(OrderEntity)
export class OrdersRepository extends BaseRepository<OrderEntity, Order> {
  transform(model: OrderEntity, transformOption = {}): Order {
    return plainToClass(
      Order,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(models: OrderEntity[], transformOption = {}): Order[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
