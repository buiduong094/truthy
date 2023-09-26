import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repository';
import { Cart } from './serializer/cart.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { CartSearchFilterDto } from './dto/carts.searchfilter.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartsRepository)
    private readonly repository: CartsRepository
  ) {}

  create(createCartDto: CreateCartDto): Promise<Cart> {
    return this.repository.createEntity(createCartDto);
  }
  /**
   * Get all Cart templates paginated list
   * @param filter
   */
  findAll(filter: CartSearchFilterDto): Promise<Pagination<Cart>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'user_id', 'status', 'des_1', 'des_2']
    );
  }

  findOne(id: number): Promise<Cart> {
    return this.repository.get(id);
  }

  /**
   * Update Cart by id
   * @param id
   * @param updateCartDto
   */
  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      user_id: updateCartDto.user_id
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'user_id',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateCartDto
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
