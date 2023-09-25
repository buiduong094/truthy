import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'products'
})
export class ProductEntity extends CustomBaseEntity {
  @Column()
  @Index({
    unique: true
  })
  name: string;

  @Column()
  category_id: number;

  @Column()
  model: string;
  @Column()
  brand: string;
  @Column()
  keywords: string;
  @Column()
  des_1: string;
  @Column()
  des_2: string;
  @Column()
  cover_id: string;
  @Column()
  isHot: boolean;
  @Column()
  isNew: boolean;
  @Column()
  isLike: boolean;
}
