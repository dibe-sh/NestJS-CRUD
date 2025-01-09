import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Body,
  UploadedFile,
  Logger,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { BadRequestResponse } from '../common/entities/app.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth-guard';
import { Request } from 'express';
import {
  UpdateArticleDto,
  UseUpdatedArticleResponse,
} from './dto/update-article.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
  private readonly logger = new Logger(ArticlesController.name);

  constructor(private readonly articleService: ArticlesService) {}

  @Post()
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

  @Put(':id')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update Article',
    type: UpdateArticleDto,
  })
  @ApiOkResponse({
    description: 'Update Article',
    type: UseUpdatedArticleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const fileUrl = !file
      ? ''
      : `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    return this.articleService.update(Number(id), updateArticleDto, fileUrl);
  }
}
