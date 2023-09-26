import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';

export class CreateQuickLinkDto {
  //
  @IsString()
  headercustom_id: string;
  @IsString()
  orderValue: string;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
}
