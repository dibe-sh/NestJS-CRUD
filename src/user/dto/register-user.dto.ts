import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiResponseProperty({
    example: 1,
  })
  id?: number;

  @ApiProperty({
    example: 'admin@admin.com',
  })
  email: string;

  @ApiProperty({
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    example: 'password',
  })
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
    default: 20,
  })
  statusCode: number;
}
