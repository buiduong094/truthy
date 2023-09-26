import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'customemails'
})
export class CustomEmailEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  typeEmail: string;

  @Column()
  order_id: number;

  @Column()
  status: string;
}
