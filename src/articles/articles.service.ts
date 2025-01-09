import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, imagePath: string) {
    return this.prisma.articles.create({
      data: {
        title: createArticleDto.title,
        description: createArticleDto.description,
        image: imagePath,
        authorId: createArticleDto.authorId,
      },
    });
  }

  async findAll() {
    return this.prisma.articles.findMany();
  }

  async findById(id: number) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.articles.update({
      where: { id },
      data: {
        title: updateArticleDto.title,
        description: updateArticleDto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.articles.delete({
      where: { id },
    });
  }
}
