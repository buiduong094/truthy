import { PartialType } from '@nestjs/swagger';
import { CreateHeaderCustomDto } from './create-headercustom.dto';

export class UpdateHeaderCustomDto extends PartialType(CreateHeaderCustomDto) {}
