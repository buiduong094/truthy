import { PartialType } from '@nestjs/swagger';
import { CreateCoperationDto } from './create-coperation.dto';

export class UpdateCoperationDto extends PartialType(CreateCoperationDto) {}
