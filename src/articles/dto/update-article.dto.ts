import {
  ApiProperty,
  ApiResponseProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(
  OmitType(CreateArticleDto, ['authorId' as const]),
) {
  @ApiResponseProperty({
    example: 1,
  })
  authorId: number;
}

export class UseUpdatedArticleResponse {
  @ApiProperty()
  data: UpdateArticleDto;
  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}
