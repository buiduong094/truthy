import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { CategoriesRepository } from './categories.repository';
import { CategoriesSearchFilterDto } from './dto/categoriesSearchFilterDto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './serializer/category.serializer';

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

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  /**
   * Update Email Template by id
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

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
