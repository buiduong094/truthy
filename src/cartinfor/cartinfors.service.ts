import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartInforDto } from './dto/create-cartinfor.dto';
import { UpdateCartInforDto } from './dto/update-cartinfor.dto';
import { CartInforsRepository } from './cartinfors.repository';
import { CartInfor } from './serializer/cartinfor.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { CartInforSearchFilterDto } from './dto/cartinfors.searchfilter.dto';

@Injectable()
export class CartInforsService {
  constructor(
    @InjectRepository(CartInforsRepository)
    private readonly repository: CartInforsRepository
  ) {}

  create(createCartInforDto: CreateCartInforDto): Promise<CartInfor> {
    return this.repository.createEntity(createCartInforDto);
  }
  /**
   * Get all CartInfor templates paginated list
   * @param filter
   */
  findAll(filter: CartInforSearchFilterDto): Promise<Pagination<CartInfor>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'cart_id', 'product_id', 'quantity', 'des_1', 'des_2', 'des_3']
    );
  }

  findOne(id: number): Promise<CartInfor> {
    return this.repository.get(id);
  }

  /**
   * Update CartInfor by id
   * @param id
   * @param updateCartInforDto
   */
  async update(
    id: number,
    updateCartInforDto: UpdateCartInforDto
  ): Promise<CartInfor> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      cart_id: updateCartInforDto.cart_id
    };
    condition.id = Not(id);
    const countSameDescription = await this.repository.countEntityByCondition(
      condition
    );
    if (countSameDescription > 0) {
      throw new UnprocessableEntityException({
        property: 'cart_id',
        constraints: {
          unique: 'already taken'
        }
      });
    }
    return this.repository.updateEntity(template, {
      ...updateCartInforDto
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
