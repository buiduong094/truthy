import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuickLinkDto } from './dto/create-quicklink.dto';
import { UpdateQuickLinkDto } from './dto/update-quicklink.dto';
import { QuickLinksRepository } from './quicklinks.repository';
import { QuickLink } from './serializer/quicklink.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { QuickLinkSearchFilterDto } from './dto/quicklinks.searchfilter.dto';

@Injectable()
export class QuickLinksService {
  constructor(
    @InjectRepository(QuickLinksRepository)
    private readonly repository: QuickLinksRepository
  ) {}

  create(createQuickLinkDto: CreateQuickLinkDto): Promise<QuickLink> {
    return this.repository.createEntity(createQuickLinkDto);
  }
  /**
   * Get all QuickLink templates paginated list
   * @param filter
   */
  findAll(filter: QuickLinkSearchFilterDto): Promise<Pagination<QuickLink>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'headercustom_id', 'orderValue', 'des_1', 'des_2']
    );
  }

  findOne(id: number): Promise<QuickLink> {
    return this.repository.get(id);
  }

  /**
   * Update QuickLink by id
   * @param id
   * @param updateQuickLinkDto
   */
  async update(
    id: number,
    updateQuickLinkDto: UpdateQuickLinkDto
  ): Promise<QuickLink> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      headercustom_id: updateQuickLinkDto.headercustom_id
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'headercustom_id',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateQuickLinkDto
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
