import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { CategoriesRepository } from './categories.repository';
import { CategoriesSearchFilterDto } from './dto/categoriesSearchFilterDto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { Category } from './serializer/category.serializer';
import { ForbiddenException } from 'src/exception/forbidden.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly repository: CategoriesRepository
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.repository.createEntity(createCategoryDto);
  }
  /**
   * Get all category templates paginated list
   * @param filter
   */
  findAll(filter: CategoriesSearchFilterDto): Promise<Pagination<Category>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'headercustom_id', 'des_1', 'des_2']
    );
  }

  findOne(id: number): Promise<Category> {
    return this.repository.get(id);
  }

  /**
   * Update Category by id
   * @param id
   * @param updateCategoryDto
   */
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      des_1: updateCategoryDto.des_1
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
      ...updateCategoryDto
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
