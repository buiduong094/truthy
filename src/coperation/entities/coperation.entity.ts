import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'coperations'
})
export class CoperationEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  images_id: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
