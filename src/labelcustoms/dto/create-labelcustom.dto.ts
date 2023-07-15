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

export class CreateLabelcustomDto {
  @IsString()
  lkey: string;

  @IsString()
  lval: string;

  @IsString()
  description: string;
}
