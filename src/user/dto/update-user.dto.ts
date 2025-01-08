import { OmitType, PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['id' as const, 'role' as const]),
) {}
