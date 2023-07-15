import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { LabelcustomEntity } from './entities/labelcustom.entity';
import { Labelcustom } from './serializer/labelcustom.serializer';

@EntityRepository(LabelcustomEntity)
export class LabelcustomsRepository extends BaseRepository<
  LabelcustomEntity,
  Labelcustom
> {
  transform(model: LabelcustomEntity, transformOption = {}): Labelcustom {
    return plainToClass(
      Labelcustom,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: LabelcustomEntity[],
    transformOption = {}
  ): Labelcustom[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
