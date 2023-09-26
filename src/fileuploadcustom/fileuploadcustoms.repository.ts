import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

import { BaseRepository } from 'src/common/repository/base.repository';
import { FileUploadCustomEntity } from './entities/fileuploadcustom.entity';
import { FileUploadCustom } from './serializer/fileuploadcustom.serializer';

@EntityRepository(FileUploadCustomEntity)
export class FileUploadCustomsRepository extends BaseRepository<
  FileUploadCustomEntity,
  FileUploadCustom
> {
  transform(
    model: FileUploadCustomEntity,
    transformOption = {}
  ): FileUploadCustom {
    return plainToClass(
      FileUploadCustom,
      classToPlain(model, transformOption),
      transformOption
    );
  }

  transformMany(
    models: FileUploadCustomEntity[],
    transformOption = {}
  ): FileUploadCustom[] {
    return models.map((model) => this.transform(model, transformOption));
  }
}
