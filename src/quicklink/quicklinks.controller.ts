import { QuickLinksService } from './quicklinks.service';
import { CreateQuickLinkDto } from './dto/create-quicklink.dto';
import { UpdateQuickLinkDto } from './dto/update-quicklink.dto';
import { QuickLink } from './serializer/quicklink.serializer';
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
import { QuickLinkSearchFilterDto } from './dto/quicklinks.searchfilter.dto';

@ApiTags('quicklinks')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('quicklinks')
export class QuickLinksController {
  constructor(private readonly quicklinksService: QuickLinksService) {}

  @Post()
  create(@Body() createCategoryDto: CreateQuickLinkDto): Promise<QuickLink> {
    return this.quicklinksService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: QuickLinkSearchFilterDto
  ): Promise<Pagination<QuickLink>> {
    return this.quicklinksService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<QuickLink> {
    return this.quicklinksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuickLinkDto: UpdateQuickLinkDto
  ): Promise<QuickLink> {
    return this.quicklinksService.update(+id, updateQuickLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.quicklinksService.remove(+id);
  }
}
