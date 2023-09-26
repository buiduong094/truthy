import { PartialType } from '@nestjs/swagger';
import { CreateCustomMessageDto } from './create-custommessage.dto';

export class UpdateCustomMessageDto extends PartialType(
  CreateCustomMessageDto
) {}
