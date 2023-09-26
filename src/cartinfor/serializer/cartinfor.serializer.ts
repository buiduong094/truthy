import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ModelSerializer } from 'src/common/serializer/model.serializer';

export class CartInfor extends ModelSerializer {
  id: number;

  //TODO
  //  @ApiProperty()
  //  lkey: string;
}
