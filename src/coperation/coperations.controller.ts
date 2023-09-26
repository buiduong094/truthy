import { CoperationsService } from './coperations.service';
import { CreateCoperationDto } from './dto/create-coperation.dto';
import { UpdateCoperationDto } from './dto/update-coperation.dto';
import { Coperation } from './serializer/coperation.serializer';
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
import { CoperationSearchFilterDto } from './dto/coperations.searchfilter.dto';

@ApiTags('coperations')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('coperations')
export class CoperationsController {
  constructor(private readonly coperationsService: CoperationsService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCoperationDto): Promise<Coperation> {
    return this.coperationsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: CoperationSearchFilterDto
  ): Promise<Pagination<Coperation>> {
    return this.coperationsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<Coperation> {
    return this.coperationsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoperationDto: UpdateCoperationDto
  ): Promise<Coperation> {
    return this.coperationsService.update(+id, updateCoperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coperationsService.remove(+id);
  }
}
