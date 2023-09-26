import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileUploadCustomDto } from './dto/create-fileuploadcustom.dto';
import { UpdateFileUploadCustomDto } from './dto/update-fileuploadcustom.dto';
import { FileUploadCustomsRepository } from './fileuploadcustoms.repository';
import { FileUploadCustom } from './serializer/fileuploadcustom.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { FileUploadCustomSearchFilterDto } from './dto/fileuploadcustoms.searchfilter.dto';

@Injectable()
export class FileUploadCustomsService {
  constructor(
    @InjectRepository(FileUploadCustomsRepository)
    private readonly repository: FileUploadCustomsRepository
  ) {}

  create(
    createFileUploadCustomDto: CreateFileUploadCustomDto
  ): Promise<FileUploadCustom> {
    return this.repository.createEntity(createFileUploadCustomDto);
  }
  /**
   * Get all FileUploadCustom templates paginated list
   * @param filter
   */
  findAll(
    filter: FileUploadCustomSearchFilterDto
  ): Promise<Pagination<FileUploadCustom>> {
    return this.repository.paginate(
      filter,
      [],
      [
        'id',
        'name',
        'oldname',
        'product_id',
        'banner_order',
        'size',
        'type',
        'des_1',
        'des_2'
      ]
    );
  }

  findOne(id: number): Promise<FileUploadCustom> {
    return this.repository.get(id);
  }

  /**
   * Update FileUploadCustom by id
   * @param id
   * @param updateFileUploadCustomDto
   */
  async update(
    id: number,
    updateFileUploadCustomDto: UpdateFileUploadCustomDto
  ): Promise<FileUploadCustom> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      name: updateFileUploadCustomDto.name
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'name',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateFileUploadCustomDto
    });
  }

  async remove(id: number): Promise<void> {
    const template = await this.findOne(id);
    if (template.isDefault) {
      throw new ForbiddenException(
        ExceptionTitleList.DeleteDefaultError,
        StatusCodesList.DeleteDefaultError
      );
    }
    await this.repository.delete({ id });
  }
}
