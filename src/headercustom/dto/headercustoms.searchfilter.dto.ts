import { PartialType } from '@nestjs/swagger';

import { CommonSearchFieldDto } from 'src/common/extra/common-search-field.dto';

export class HeaderCustomSearchFilterDto extends PartialType(
  CommonSearchFieldDto
) {}
