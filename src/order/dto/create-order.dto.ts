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

export class CreateOrderDto {
  //
  @IsString()
  user_id: string;
  @IsString()
  inq_name: string;
  @IsString()
  inq_email: string;
  @IsString()
  inq_company_name: string;
  @IsString()
  inq_tel: string;
  @IsString()
  inq_message: string;
  @IsString()
  status: string;
  @IsString()
  des_1: string;
  @IsString()
  des_2: string;
}
