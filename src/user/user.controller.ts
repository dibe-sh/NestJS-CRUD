import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto, UseRegisteredResponse } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../entities/app.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User created',
    type: UseRegisteredResponse,
  })
  @ApiBadRequestResponse({
    description: 'Internal Server Error',
    type: BadRequestResponse,
  })
  async create(@Body() data: RegisterUserDto) {
    return this.userService.create(data);
  }
}
