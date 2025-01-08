import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { HealthCheckResponse } from './entities/app.entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOkResponse({
    description: 'API Health Check',
    type: HealthCheckResponse,
  })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
