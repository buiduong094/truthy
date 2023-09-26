import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoperationDto } from './dto/create-coperation.dto';
import { UpdateCoperationDto } from './dto/update-coperation.dto';
import { CoperationsRepository } from './coperations.repository';
import { Coperation } from './serializer/coperation.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { CoperationSearchFilterDto } from './dto/coperations.searchfilter.dto';

@Injectable()
export class CoperationsService {
  constructor(
    @InjectRepository(CoperationsRepository)
    private readonly repository: CoperationsRepository
  ) {}

  create(createCoperationDto: CreateCoperationDto): Promise<Coperation> {
    return this.repository.createEntity(createCoperationDto);
  }
  /**
   * Get all Coperation templates paginated list
   * @param filter
   */
  findAll(filter: CoperationSearchFilterDto): Promise<Pagination<Coperation>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'name', 'description', 'images_id', 'des_1', 'des_2']
    );
  }

  findOne(id: number): Promise<Coperation> {
    return this.repository.get(id);
  }

  /**
   * Update Coperation by id
   * @param id
   * @param updateCoperationDto
   */
  async update(
    id: number,
    updateCoperationDto: UpdateCoperationDto
  ): Promise<Coperation> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      name: updateCoperationDto.name
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
      ...updateCoperationDto
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
