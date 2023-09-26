import { CustomEmailsService } from './customemails.service';
import { CreateCustomEmailDto } from './dto/create-customemail.dto';
import { UpdateCustomEmailDto } from './dto/update-customemail.dto';
import { CustomEmail } from './serializer/customemail.serializer';
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
import { CustomEmailSearchFilterDto } from './dto/customemails.searchfilter.dto';

@ApiTags('customemails')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('customemails')
export class CustomEmailsController {
  constructor(private readonly customemailsService: CustomEmailsService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCustomEmailDto
  ): Promise<CustomEmail> {
    return this.customemailsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: CustomEmailSearchFilterDto
  ): Promise<Pagination<CustomEmail>> {
    return this.customemailsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<CustomEmail> {
    return this.customemailsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomEmailDto: UpdateCustomEmailDto
  ): Promise<CustomEmail> {
    return this.customemailsService.update(+id, updateCustomEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customemailsService.remove(+id);
  }
}
