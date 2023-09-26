import { OrderInforsService } from './orderinfors.service';
import { CreateOrderInforDto } from './dto/create-orderinfor.dto';
import { UpdateOrderInforDto } from './dto/update-orderinfor.dto';
import { OrderInfor } from './serializer/orderinfor.serializer';
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
import { OrderInforSearchFilterDto } from './dto/orderinfors.searchfilter.dto';

@ApiTags('orderinfors')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('orderinfors')
export class OrderInforsController {
  constructor(private readonly orderinforsService: OrderInforsService) {}

  @Post()
  create(@Body() createCategoryDto: CreateOrderInforDto): Promise<OrderInfor> {
    return this.orderinforsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: OrderInforSearchFilterDto
  ): Promise<Pagination<OrderInfor>> {
    return this.orderinforsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<OrderInfor> {
    return this.orderinforsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderInforDto: UpdateOrderInforDto
  ): Promise<OrderInfor> {
    return this.orderinforsService.update(+id, updateOrderInforDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderinforsService.remove(+id);
  }
}
