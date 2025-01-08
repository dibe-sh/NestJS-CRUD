import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(registerUser: RegisterUserDto) {
    const user = await this.findByEmail(registerUser.email);
    if (!user) {
      const hashedPassword = await bcrypt.hash(registerUser.password, 10);
      const data = {
        ...registerUser,
        password: hashedPassword,
        role: Role.USER,
      };
      const newUser = await this.prisma.user.create({ data });
      delete newUser.password;
      return newUser;
    }
    throw new HttpException(
      'User with given email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    delete updated.password;
    return updated;
  }

  async remove(id: number, currentUserId: number) {
    const user = await this.findById(currentUserId);

    if (user.role === 'ADMIN')
      throw new NotFoundException('Admin cannot be deleted');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
