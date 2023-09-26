import { CartInforsService } from './cartinfors.service';
import { CreateCartInforDto } from './dto/create-cartinfor.dto';
import { UpdateCartInforDto } from './dto/update-cartinfor.dto';
import { CartInfor } from './serializer/cartinfor.serializer';
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
import { CartInforSearchFilterDto } from './dto/cartinfors.searchfilter.dto';

@ApiTags('cartinfors')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('cartinfors')
export class CartInforsController {
  constructor(private readonly cartinforsService: CartInforsService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCartInforDto): Promise<CartInfor> {
    return this.cartinforsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: CartInforSearchFilterDto
  ): Promise<Pagination<CartInfor>> {
    return this.cartinforsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<CartInfor> {
    return this.cartinforsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartInforDto: UpdateCartInforDto
  ): Promise<CartInfor> {
    return this.cartinforsService.update(+id, updateCartInforDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartinforsService.remove(+id);
  }
}
