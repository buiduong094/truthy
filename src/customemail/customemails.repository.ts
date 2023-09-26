import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CustomEmailEntity } from './entities/customemail.entity';
import { CustomEmail } from './serializer/customemail.serializer';

@EntityRepository(CustomEmailEntity)
export class CustomEmailsRepository extends BaseRepository<
  CustomEmailEntity,
  CustomEmail
> {
  transform(model: CustomEmailEntity, transformOption = {}): CustomEmail {
    return plainToClass(
      CustomEmail,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: CustomEmailEntity[],
    transformOption = {}
  ): CustomEmail[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
