import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogionUserDto {
  @ApiProperty({
    example: 'admin@admin.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

class LoginResponse {
  @ApiResponseProperty()
  access_token: string;
}

export class UseLoggedInResponse {
  @ApiProperty()
  data: LoginResponse;

  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}
