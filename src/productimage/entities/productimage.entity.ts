import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'productimages'
})
export class ProductImageEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  product_id: number;

  @Column()
  attachment_id: string;
}
