import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
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
    example: 'QwertFF123',
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Is Required' })
  @IsStrongPassword({}, { message: 'Must be a strong password' })
  password: string;
}
