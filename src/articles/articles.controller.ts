import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Body,
  UploadedFile,
  Logger,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { BadRequestResponse } from '../common/entities/app.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth-guard';
import { Request } from 'express';

@Controller('articles')
export class ArticlesController {
  private readonly logger = new Logger(ArticlesController.name);

  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Article' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Article',
    type: CreateArticleDto,
  })
  @ApiCreatedResponse({
    description: 'Create Article',
    type: CreateArticleDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const fileUrl = !file
      ? ''
      : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    return this.articleService.create(createArticleDto, fileUrl);
  }
}
