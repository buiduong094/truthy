import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { QuickLinkEntity } from './entities/quicklink.entity';
import { QuickLink } from './serializer/quicklink.serializer';

@EntityRepository(QuickLinkEntity)
export class QuickLinksRepository extends BaseRepository<
  QuickLinkEntity,
  QuickLink
> {
  transform(model: QuickLinkEntity, transformOption = {}): QuickLink {
    return plainToClass(
      QuickLink,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(models: QuickLinkEntity[], transformOption = {}): QuickLink[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
