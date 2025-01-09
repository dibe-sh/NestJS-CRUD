import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiResponseProperty({
    example: 1,
  })
  id?: number;

  @ApiProperty({
    example: 'What is Lorem Ipsum?',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload an image file for the article',
  })
  image: Express.Multer.File;

  @ApiProperty({
    default: 1,
  })
  @IsNotEmpty()
  authorId: number;

  @ApiResponseProperty({
    example: new Date(),
  })
  created_at?: Date;

  @ApiResponseProperty({
    example: new Date(),
  })
  updated_at?: Date;
}

export class UseCreateArticleResponse {
  @ApiProperty()
  data: CreateArticleDto;

  @ApiProperty({
    default: 201,
  })
  statusCode: number;
}
