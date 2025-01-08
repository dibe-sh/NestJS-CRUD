import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['id' as const, 'role' as const]),
) {}

export class UseUpdatedResponse {
  @ApiProperty()
  data: UpdateUserDto;
  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}
