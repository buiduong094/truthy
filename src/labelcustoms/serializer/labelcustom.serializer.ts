import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ModelSerializer } from 'src/common/serializer/model.serializer';

export class Labelcustom extends ModelSerializer {
  id: number;

  @ApiProperty()
  lkey: string;

  @ApiProperty()
  lval: string;

  @ApiProperty()
  description: string;
}
