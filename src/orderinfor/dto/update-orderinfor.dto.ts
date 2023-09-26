import { PartialType } from '@nestjs/swagger';
import { CreateOrderInforDto } from './create-orderinfor.dto';

export class UpdateOrderInforDto extends PartialType(CreateOrderInforDto) {}
