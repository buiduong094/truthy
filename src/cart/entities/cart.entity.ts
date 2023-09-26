import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'carts'
})
export class CartEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  user_id: string;

  @Column()
  status: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
