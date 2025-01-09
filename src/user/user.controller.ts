import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  RegisterUserDto,
  UseRegisteredResponse,
} from './dto/register-user.dto';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  UnauthorizedResponse,
} from '../common/entities/app.entity';
import { UpdateUserDto, UseUpdatedResponse } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth-guard';

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
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  async create(@Body() data: RegisterUserDto) {
    return this.userService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    description: 'User Updated',
    type: UseUpdatedResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponse,
  })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(Number(id), data);
  }
}
