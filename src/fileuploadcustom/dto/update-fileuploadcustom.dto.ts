import { PartialType } from '@nestjs/swagger';
import { CreateFileUploadCustomDto } from './create-fileuploadcustom.dto';

export class UpdateFileUploadCustomDto extends PartialType(
  CreateFileUploadCustomDto
) {}
