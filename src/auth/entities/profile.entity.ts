import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProfileEntity {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User email adress',
    example: 'zibbid33@mail.ru',
  })
  email: string;

  @IsOptional()
  @ApiProperty({
    description: 'User name',
    example: 'Kirich',
  })
  name?: string;

  @ApiProperty({
    description: 'User password',
    example: 'QwErt2331',
  })
  password: string;

  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2024-07-21T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the user was last updated',
    example: '2024-07-21T15:30:00Z',
  })
  updatedAt: Date;
}
