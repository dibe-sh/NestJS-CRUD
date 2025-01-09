import {
  ApiResponseProperty,
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { RegisterUserDto } from '../../user/dto/register-user.dto';

class Author extends PartialType(
  OmitType(RegisterUserDto, ['password', 'created_at', 'updated_at']),
) {}

export class ArticleDto {
  @ApiResponseProperty({
    example: 1,
  })
  id: number;

  @ApiResponseProperty({
    example: 'What is Lorem Ipsum?',
  })
  title: string;

  @ApiResponseProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  description: string;

  @ApiResponseProperty({
    example: 'http://localhost...',
  })
  image: string;

  @ApiResponseProperty({
    example: 1,
  })
  authorId: number;

  @ApiResponseProperty({
    example: new Date(),
  })
  created_at?: Date;

  @ApiResponseProperty({
    example: new Date(),
  })
  updated_at: Date;

  @ApiProperty()
  author: Author;
}

export class UseArticleListResponse {
  @ApiResponseProperty({ type: [ArticleDto] })
  data: ArticleDto[];

  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}

export class UseArticleResponse {
  @ApiProperty()
  data: ArticleDto;

  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}
