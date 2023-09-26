import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'orders'
})
export class OrderEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  user_id: string;

  @Column()
  inq_name: string;

  @Column()
  inq_email: string;

  @Column()
  inq_company_name: string;

  @Column()
  inq_tel: string;

  @Column()
  inq_message: string;

  @Column()
  status: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
