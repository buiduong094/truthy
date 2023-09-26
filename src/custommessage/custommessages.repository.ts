import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { CustomMessageEntity } from './entities/custommessage.entity';
import { CustomMessage } from './serializer/custommessage.serializer';

@EntityRepository(CustomMessageEntity)
export class CustomMessagesRepository extends BaseRepository<
  CustomMessageEntity,
  CustomMessage
> {
  transform(model: CustomMessageEntity, transformOption = {}): CustomMessage {
    return plainToClass(
      CustomMessage,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: CustomMessageEntity[],
    transformOption = {}
  ): CustomMessage[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
