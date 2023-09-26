import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'quicklinks'
})
export class QuickLinkEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  headercustom_id: string;

  @Column()
  orderValue: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
