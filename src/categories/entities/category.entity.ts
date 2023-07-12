import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'categories'
})
export class CategoryEntity extends CustomBaseEntity {
  @Column()
  @Index({
    unique: true
  })
  headercustom_id: string;

  @Column()
  keywords: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
