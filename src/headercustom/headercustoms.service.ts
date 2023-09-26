import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHeaderCustomDto } from './dto/create-headercustom.dto';
import { UpdateHeaderCustomDto } from './dto/update-headercustom.dto';
import { HeaderCustomsRepository } from './headercustoms.repository';
import { HeaderCustom } from './serializer/headercustom.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { HeaderCustomSearchFilterDto } from './dto/headercustoms.searchfilter.dto';

@Injectable()
export class HeaderCustomsService {
  constructor(
    @InjectRepository(HeaderCustomsRepository)
    private readonly repository: HeaderCustomsRepository
  ) {}

  create(createHeaderCustomDto: CreateHeaderCustomDto): Promise<HeaderCustom> {
    return this.repository.createEntity(createHeaderCustomDto);
  }
  /**
   * Get all HeaderCustom templates paginated list
   * @param filter
   */
  findAll(
    filter: HeaderCustomSearchFilterDto
  ): Promise<Pagination<HeaderCustom>> {
    return this.repository.paginate(
      filter,
      [],
      [
        'id',
        'name',
        'orderValue',
        'parent_id',
        'url',
        'is_productlist',
        'is_display',
        'image_id',
        'des_1',
        'des_2'
      ]
    );
  }

  findOne(id: number): Promise<HeaderCustom> {
    return this.repository.get(id);
  }

  /**
   * Update HeaderCustom by id
   * @param id
   * @param updateHeaderCustomDto
   */
  async update(
    id: number,
    updateHeaderCustomDto: UpdateHeaderCustomDto
  ): Promise<HeaderCustom> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      name: updateHeaderCustomDto.name
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
      ...updateHeaderCustomDto
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
