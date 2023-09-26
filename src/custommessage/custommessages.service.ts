import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomMessageDto } from './dto/create-custommessage.dto';
import { UpdateCustomMessageDto } from './dto/update-custommessage.dto';
import { CustomMessagesRepository } from './custommessages.repository';
import { CustomMessage } from './serializer/custommessage.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { CustomMessageSearchFilterDto } from './dto/custommessages.searchfilter.dto';

@Injectable()
export class CustomMessagesService {
  constructor(
    @InjectRepository(CustomMessagesRepository)
    private readonly repository: CustomMessagesRepository
  ) {}

  create(
    createCustomMessageDto: CreateCustomMessageDto
  ): Promise<CustomMessage> {
    return this.repository.createEntity(createCustomMessageDto);
  }
  /**
   * Get all CustomMessage templates paginated list
   * @param filter
   */
  findAll(
    filter: CustomMessageSearchFilterDto
  ): Promise<Pagination<CustomMessage>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'name', 'phone', 'email', 'message', 'des_1', 'status']
    );
  }

  findOne(id: number): Promise<CustomMessage> {
    return this.repository.get(id);
  }

  /**
   * Update CustomMessage by id
   * @param id
   * @param updateCustomMessageDto
   */
  async update(
    id: number,
    updateCustomMessageDto: UpdateCustomMessageDto
  ): Promise<CustomMessage> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      name: updateCustomMessageDto.name
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
      ...updateCustomMessageDto
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
