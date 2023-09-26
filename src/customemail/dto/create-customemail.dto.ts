import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';

export class CreateCustomEmailDto {
  //
  @IsString()
  typeEmail: string;
  @IsNumber()
  order_id: number;
  @IsString()
  status: string;
}
