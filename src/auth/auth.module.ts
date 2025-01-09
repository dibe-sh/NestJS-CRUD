import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
})
export class AuthModule {}
