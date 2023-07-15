import { PartialType } from '@nestjs/swagger';
import { CreateLabelcustomDto } from './create-labelcustom.dto';

export class UpdateLabelcustomDto extends PartialType(CreateLabelcustomDto) {}
