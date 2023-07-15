import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLabelcustomDto } from './dto/create-labelcustom.dto';
import { UpdateLabelcustomDto } from './dto/update-labelcustom.dto';
import { LabelcustomsRepository } from './labelcustoms.repository';
import { Labelcustom } from './serializer/labelcustom.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { LabelcustomSearchFilterDto } from './dto/labelcustoms.searchfilter.dto';

@Injectable()
export class LabelcustomsService {
  constructor(
    @InjectRepository(LabelcustomsRepository)
    private readonly repository: LabelcustomsRepository
  ) {}

  create(createLabelcustomDto: CreateLabelcustomDto): Promise<Labelcustom> {
    return this.repository.createEntity(createLabelcustomDto);
  }
  /**
   * Get all Labelcustom templates paginated list
   * @param filter
   */
  findAll(
    filter: LabelcustomSearchFilterDto
  ): Promise<Pagination<Labelcustom>> {
    return this.repository.paginate(
      filter,
      [],
      ['lkey', 'lval', 'description']
    );
  }

  findOne(id: number): Promise<Labelcustom> {
    return this.repository.get(id);
  }

  /**
   * Update Labelcustom by id
   * @param id
   * @param updateLabelcustomDto
   */
  async update(
    id: number,
    updateLabelcustomDto: UpdateLabelcustomDto
  ): Promise<Labelcustom> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      description: updateLabelcustomDto.description
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'lkey',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateLabelcustomDto
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
