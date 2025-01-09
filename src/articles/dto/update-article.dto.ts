import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class UseUpdatedArticleResponse {
  @ApiProperty()
  data: UpdateArticleDto;
  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}
