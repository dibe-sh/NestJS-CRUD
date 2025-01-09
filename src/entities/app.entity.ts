import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponse {
  @ApiProperty({
    default: 'API is up and running! 🏃‍♂️',
  })
  data: string;
  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}

export class BadRequestResponse {
  @ApiProperty({
    default: 'Bad Request',
  })
  data: string;
  @ApiProperty({
    default: 400,
  })
  statusCode: number;
}

export class UnauthorizedResponse {
  @ApiProperty({
    default: 'Unauthorized',
  })
  data: string;
  @ApiProperty({
    default: 401,
  })
  statusCode: number;
}

export class InternalServerErrorResponse {
  @ApiProperty({
    default: 'Internal Server Error',
  })
  data: string;
  @ApiProperty({
    default: 500,
  })
  statusCode: number;
}
