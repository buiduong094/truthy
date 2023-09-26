import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './serializer/order.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { OrderSearchFilterDto } from './dto/orders.searchfilter.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly repository: OrdersRepository
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.repository.createEntity(createOrderDto);
  }
  /**
   * Get all Order templates paginated list
   * @param filter
   */
  findAll(filter: OrderSearchFilterDto): Promise<Pagination<Order>> {
    return this.repository.paginate(
      filter,
      [],
      [
        'id',
        'user_id',
        'inq_name',
        'inq_email',
        'inq_company_name',
        'inq_tel',
        'inq_message',
        'status',
        'des_1',
        'des_2'
      ]
    );
  }

  findOne(id: number): Promise<Order> {
    return this.repository.get(id);
  }

  /**
   * Update Order by id
   * @param id
   * @param updateOrderDto
   */
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      user_id: updateOrderDto.user_id
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
      ...updateOrderDto
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
