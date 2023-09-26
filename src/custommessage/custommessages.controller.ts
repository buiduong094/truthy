import { CustomMessagesService } from './custommessages.service';
import { CreateCustomMessageDto } from './dto/create-custommessage.dto';
import { UpdateCustomMessageDto } from './dto/update-custommessage.dto';
import { CustomMessage } from './serializer/custommessage.serializer';
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
import { CustomMessageSearchFilterDto } from './dto/custommessages.searchfilter.dto';

@ApiTags('custommessages')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('custommessages')
export class CustomMessagesController {
  constructor(private readonly custommessagesService: CustomMessagesService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCustomMessageDto
  ): Promise<CustomMessage> {
    return this.custommessagesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: CustomMessageSearchFilterDto
  ): Promise<Pagination<CustomMessage>> {
    return this.custommessagesService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<CustomMessage> {
    return this.custommessagesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomMessageDto: UpdateCustomMessageDto
  ): Promise<CustomMessage> {
    return this.custommessagesService.update(+id, updateCustomMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.custommessagesService.remove(+id);
  }
}
