import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'cartinfors'
})
export class CartInforEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  cart_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  des_1: string;

  @Column()
  des_2: string;

  @Column()
  des_3: string;
}
