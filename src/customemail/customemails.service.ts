import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomEmailDto } from './dto/create-customemail.dto';
import { UpdateCustomEmailDto } from './dto/update-customemail.dto';
import { CustomEmailsRepository } from './customemails.repository';
import { CustomEmail } from './serializer/customemail.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { CustomEmailSearchFilterDto } from './dto/customemails.searchfilter.dto';

@Injectable()
export class CustomEmailsService {
  constructor(
    @InjectRepository(CustomEmailsRepository)
    private readonly repository: CustomEmailsRepository
  ) {}

  create(createCustomEmailDto: CreateCustomEmailDto): Promise<CustomEmail> {
    return this.repository.createEntity(createCustomEmailDto);
  }
  /**
   * Get all CustomEmail templates paginated list
   * @param filter
   */
  findAll(
    filter: CustomEmailSearchFilterDto
  ): Promise<Pagination<CustomEmail>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'typeEmail', 'order_id', 'status']
    );
  }

  findOne(id: number): Promise<CustomEmail> {
    return this.repository.get(id);
  }

  /**
   * Update CustomEmail by id
   * @param id
   * @param updateCustomEmailDto
   */
  async update(
    id: number,
    updateCustomEmailDto: UpdateCustomEmailDto
  ): Promise<CustomEmail> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      order_id: updateCustomEmailDto.order_id
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'order_id',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateCustomEmailDto
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
