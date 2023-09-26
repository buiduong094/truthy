import { FileUploadCustomsService } from './fileuploadcustoms.service';
import { CreateFileUploadCustomDto } from './dto/create-fileuploadcustom.dto';
import { UpdateFileUploadCustomDto } from './dto/update-fileuploadcustom.dto';
import { FileUploadCustom } from './serializer/fileuploadcustom.serializer';
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
import { FileUploadCustomSearchFilterDto } from './dto/fileuploadcustoms.searchfilter.dto';

@ApiTags('fileuploadcustoms')
// @UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('fileuploadcustoms')
export class FileUploadCustomsController {
  constructor(
    private readonly fileuploadcustomsService: FileUploadCustomsService
  ) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateFileUploadCustomDto
  ): Promise<FileUploadCustom> {
    return this.fileuploadcustomsService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() filter: FileUploadCustomSearchFilterDto
  ): Promise<Pagination<FileUploadCustom>> {
    return this.fileuploadcustomsService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<FileUploadCustom> {
    return this.fileuploadcustomsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadCustomDto: UpdateFileUploadCustomDto
  ): Promise<FileUploadCustom> {
    return this.fileuploadcustomsService.update(+id, updateFileUploadCustomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileuploadcustomsService.remove(+id);
  }
}
