import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'this is user email',
    example: 'zibbid33@mail.ru',
  })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be a email' })
  @IsNotEmpty({ message: 'Is Required' })
  email: string;

  @ApiProperty({
    description: 'this is user password',
    example: 'QwErt2331',
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Is Required' })
  @IsStrongPassword({}, { message: 'Must be a strong password' })
  password: string;

  @ApiProperty({
    description: 'this is user name',
    example: 'Kirich',
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name?: string;
}
