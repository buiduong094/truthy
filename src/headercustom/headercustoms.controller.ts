import { HeaderCustomsService } from './headercustoms.service';
import { CreateHeaderCustomDto } from './dto/create-headercustom.dto';
import { UpdateHeaderCustomDto } from './dto/update-headercustom.dto';
import { HeaderCustom } from './serializer/headercustom.serializer';
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
import { HeaderCustomSearchFilterDto } from './dto/headercustoms.searchfilter.dto';

@ApiTags('headercustoms')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('headercustoms')
export class HeaderCustomsController {
  constructor(private readonly headercustomsService: HeaderCustomsService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateHeaderCustomDto
  ): Promise<HeaderCustom> {
    return this.headercustomsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: HeaderCustomSearchFilterDto
  ): Promise<Pagination<HeaderCustom>> {
    return this.headercustomsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<HeaderCustom> {
    return this.headercustomsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeaderCustomDto: UpdateHeaderCustomDto
  ): Promise<HeaderCustom> {
    return this.headercustomsService.update(+id, updateHeaderCustomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.headercustomsService.remove(+id);
  }
}
