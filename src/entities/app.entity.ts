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
