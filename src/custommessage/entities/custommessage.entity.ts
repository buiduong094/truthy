import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'custommessages'
})
export class CustomMessageEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  message: string;

  @Column()
  des_1: string;

  @Column()
  status: string;
}
