import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create() {}
  async findAll() {}
  async findOne() {}
  async update() {}
  async remove() {}
}
