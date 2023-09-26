import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'headercustoms'
})
export class HeaderCustomEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  name: string;

  @Column()
  orderValue: string;

  @Column()
  parent_id: string;

  @Column()
  url: string;

  @Column()
  is_productlist: string;

  @Column()
  is_display: string;

  @Column()
  image_id: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
