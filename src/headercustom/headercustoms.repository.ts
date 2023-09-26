import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { HeaderCustomEntity } from './entities/headercustom.entity';
import { HeaderCustom } from './serializer/headercustom.serializer';

@EntityRepository(HeaderCustomEntity)
export class HeaderCustomsRepository extends BaseRepository<
  HeaderCustomEntity,
  HeaderCustom
> {
  transform(model: HeaderCustomEntity, transformOption = {}): HeaderCustom {
    return plainToClass(
      HeaderCustom,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: HeaderCustomEntity[],
    transformOption = {}
  ): HeaderCustom[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
