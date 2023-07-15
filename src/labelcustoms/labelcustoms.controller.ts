import { LabelcustomsService } from './labelcustoms.service';
import { CreateLabelcustomDto } from './dto/create-labelcustom.dto';
import { UpdateLabelcustomDto } from './dto/update-labelcustom.dto';
import { Labelcustom } from './serializer/labelcustom.serializer';
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
import { LabelcustomSearchFilterDto } from './dto/labelcustoms.searchfilter.dto';

@ApiTags('label-customs')
@UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('label-customs')
export class LabelcustomsController {
  constructor(private readonly labelcustomsService: LabelcustomsService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateLabelcustomDto
  ): Promise<Labelcustom> {
    return this.labelcustomsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: LabelcustomSearchFilterDto
  ): Promise<Pagination<Labelcustom>> {
    return this.labelcustomsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<Labelcustom> {
    return this.labelcustomsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabelcustomDto: UpdateLabelcustomDto
  ): Promise<Labelcustom> {
    return this.labelcustomsService.update(+id, updateLabelcustomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.labelcustomsService.remove(+id);
  }
}
