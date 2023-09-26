import { PartialType } from '@nestjs/swagger';
import { CreateCustomEmailDto } from './create-customemail.dto';

export class UpdateCustomEmailDto extends PartialType(CreateCustomEmailDto) {}
