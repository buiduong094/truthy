import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({
  name: 'fileuploadcustoms'
})
export class FileUploadCustomEntity extends CustomBaseEntity {
  @Index({
    unique: true
  })

  //
  @Column()
  name: string;

  @Column()
  oldname: string;

  @Column()
  product_id: string;

  @Column()
  banner_order: number;

  @Column()
  size: string;

  @Column()
  type: string;

  @Column()
  des_1: string;

  @Column()
  des_2: string;
}
