import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['role' as const, 'email' as const]),
) {
  @ApiProperty({
    example: 'old password',
  })
  @IsNotEmpty()
  @IsString()
  old_password: string;
}

export class UseUpdatedResponse {
  @ApiProperty()
  data: UpdateUserDto;
  @ApiProperty({
    default: 200,
  })
  statusCode: number;
}
