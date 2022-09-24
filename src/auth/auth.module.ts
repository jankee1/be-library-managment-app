import { UserModule } from './../user/user.module';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh.strategy';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshTokenStrategy],
  imports: [
    JwtModule.register({}),
    UserModule
  ],
})
export class AuthModule {}
