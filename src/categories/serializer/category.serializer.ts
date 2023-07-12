import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ModelSerializer } from 'src/common/serializer/model.serializer';

export class Category extends ModelSerializer {
  id: number;

  @ApiProperty()
  headercustom_id: string;

  @ApiProperty()
  keywords: string;

  @ApiProperty()
  des_1: string;

  @ApiProperty()
  des_2: string;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}
