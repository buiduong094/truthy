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

export class CreateCartDto {
  //
  @IsString()
  user_id: string;
  @IsString()
  status: string;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
}
