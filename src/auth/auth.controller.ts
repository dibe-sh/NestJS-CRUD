import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogionUserDto, UseLoggedInResponse } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../entities/app.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({
    description: 'User Login',
    type: UseLoggedInResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  async login(@Body() data: LogionUserDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    return this.authService.login(user);
  }
}
