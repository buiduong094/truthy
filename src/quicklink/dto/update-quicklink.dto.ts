import { PartialType } from '@nestjs/swagger';
import { CreateQuickLinkDto } from './create-quicklink.dto';

export class UpdateQuickLinkDto extends PartialType(CreateQuickLinkDto) {}
