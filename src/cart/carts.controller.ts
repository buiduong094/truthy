import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './serializer/cart.serializer';
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
import { CartSearchFilterDto } from './dto/carts.searchfilter.dto';

@ApiTags('carts')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCartDto): Promise<Cart> {
    return this.cartsService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() filter: CartSearchFilterDto): Promise<Pagination<Cart>> {
    return this.cartsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<Cart> {
    return this.cartsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto
  ): Promise<Cart> {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartsService.remove(+id);
  }
}
