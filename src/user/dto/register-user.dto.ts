import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @ApiResponseProperty({
    example: 1,
  })
  id?: number;

  @ApiProperty({
    example: 'admin@admin.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiResponseProperty({
    example: 'USER',
  })
  role?: string;

  @ApiResponseProperty({
    example: new Date(),
  })
  created_at?: Date;

  @ApiResponseProperty({
    example: new Date(),
  })
  updated_at?: Date;
}

export class UseRegisteredResponse {
  @ApiProperty()
  data: RegisterUserDto;

  @ApiProperty({
    default: 201,
  })
  statusCode: number;
}
