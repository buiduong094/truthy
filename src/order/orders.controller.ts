import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './serializer/order.serializer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Pagination } from 'src/paginate';
import { OrderSearchFilterDto } from './dto/orders.searchfilter.dto';

@ApiTags('orders')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createCategoryDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() filter: OrderSearchFilterDto): Promise<Pagination<Order>> {
    return this.ordersService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<Order> {
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(+id);
  }
}
