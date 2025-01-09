import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import * as fs from 'fs';
import * as path from 'path';

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
      // include: {
      //   author: true,
      // },
    });
  }

  async findAll() {
    return this.prisma.articles.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async deleteImage(image: string) {
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    const imagePath = path.resolve(uploadDir, image);
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
    newFileUrl: string,
  ) {
    const existingArticle = await this.findById(id);
    let isImageUpdated = false;
    // Delete Image if new image is provided
    if (newFileUrl != '' && existingArticle.image.length > 1) {
      const oldImage = existingArticle.image.split('/uploads/')[1];
      const newImage = newFileUrl.split('/uploads/')[1];
      // Image Updated
      if (oldImage != newImage) {
        isImageUpdated = true;
        this.deleteImage(oldImage);
      }
    }

    return this.prisma.articles.update({
      where: { id },
      data: {
        title: updateArticleDto.title,
        description: updateArticleDto.description,
        image: isImageUpdated ? newFileUrl : existingArticle.image,
      },
    });
  }

  async remove(id: number) {
    const existingArticle = await this.findById(id);

    if (existingArticle.image.length > 1) {
      const oldImage = existingArticle.image.split('/uploads/')[1];
      this.deleteImage(oldImage);
    }

    return this.prisma.articles.delete({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }
}
