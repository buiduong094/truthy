import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ModelSerializer } from 'src/common/serializer/model.serializer';

export class Order extends ModelSerializer {
  id: number;

  //TODO
  //  @ApiProperty()
  //  lkey: string;
}
