import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'labelcustoms'
})
export class LabelcustomEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })
  @Column()
  lkey: string;

  @Column()
  lval: string;

  @Column()
  description: string;
}
