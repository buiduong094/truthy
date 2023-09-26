import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderInforDto } from './dto/create-orderinfor.dto';
import { UpdateOrderInforDto } from './dto/update-orderinfor.dto';
import { OrderInforsRepository } from './orderinfors.repository';
import { OrderInfor } from './serializer/orderinfor.serializer';
import { Pagination } from 'src/paginate';
import { Not, ObjectLiteral } from 'typeorm';
import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { ExceptionTitleList } from 'src/common/constants/exception-title-list.constants';
import { OrderInforSearchFilterDto } from './dto/orderinfors.searchfilter.dto';

@Injectable()
export class OrderInforsService {
  constructor(
    @InjectRepository(OrderInforsRepository)
    private readonly repository: OrderInforsRepository
  ) {}

  create(createOrderInforDto: CreateOrderInforDto): Promise<OrderInfor> {
    return this.repository.createEntity(createOrderInforDto);
  }
  /**
   * Get all OrderInfor templates paginated list
   * @param filter
   */
  findAll(filter: OrderInforSearchFilterDto): Promise<Pagination<OrderInfor>> {
    return this.repository.paginate(
      filter,
      [],
      ['id', 'order_id', 'product_id', 'quantity', 'des_1', 'des_2']
    );
  }

  findOne(id: number): Promise<OrderInfor> {
    return this.repository.get(id);
  }

  /**
   * Update OrderInfor by id
   * @param id
   * @param updateOrderInforDto
   */
  async update(
    id: number,
    updateOrderInforDto: UpdateOrderInforDto
  ): Promise<OrderInfor> {
    const template = await this.repository.get(id);
    const condition: ObjectLiteral = {
      order_id: updateOrderInforDto.order_id
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
      ...updateOrderInforDto
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
