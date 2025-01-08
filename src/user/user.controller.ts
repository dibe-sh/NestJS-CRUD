import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import {
  RegisterUserDto,
  UseRegisteredResponse,
} from './dto/register-user.dto';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BadRequestResponse } from '../entities/app.entity';
import { UpdateUserDto, UseUpdatedResponse } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({
    description: 'Register User',
    type: UseRegisteredResponse,
  })
  @ApiBadRequestResponse({
    description: 'Internal Server Error',
    type: BadRequestResponse,
  })
  async create(@Body() data: RegisterUserDto) {
    return this.userService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    description: 'Register User',
    type: UseUpdatedResponse,
  })
  @ApiBadRequestResponse({
    description: 'Internal Server Error',
    type: BadRequestResponse,
  })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(Number(id), data);
  }
}
