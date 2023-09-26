import { PartialType } from '@nestjs/swagger';
import { CreateCartInforDto } from './create-cartinfor.dto';

export class UpdateCartInforDto extends PartialType(CreateCartInforDto) {}
