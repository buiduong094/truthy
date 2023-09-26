import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'orderinfors'
})
export class OrderInforEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
