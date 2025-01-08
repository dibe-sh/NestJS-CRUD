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
  @ApiProperty()
  data: string;
  @ApiProperty({
    default: 400,
  })
  statusCode: number;
}

export class InternalServerErrorResponse {
  @ApiProperty()
  data: string;
  @ApiProperty({
    default: 500,
  })
  statusCode: number;
}
