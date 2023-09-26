import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CoperationEntity } from './entities/coperation.entity';
import { Coperation } from './serializer/coperation.serializer';

@EntityRepository(CoperationEntity)
export class CoperationsRepository extends BaseRepository<
  CoperationEntity,
  Coperation
> {
  transform(model: CoperationEntity, transformOption = {}): Coperation {
    return plainToClass(
      Coperation,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: CoperationEntity[],
    transformOption = {}
  ): Coperation[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
