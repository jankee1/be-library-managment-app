import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtPayloadDecoded } from './../../types/auth/jwt.payload';
import { JWT_REFRESH_TOKEN_COOKIE, JWT_SECRET_REFRESH_TOKEN } from './../../../settings';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  secondMultiplier:number = 1000 // 1000ms = 1s

  constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
          return request?.cookies?.[JWT_REFRESH_TOKEN_COOKIE];
        }]),
        secretOrKey: JWT_SECRET_REFRESH_TOKEN,
        passReqToCallback: true,
        ignoreExpiration: false,
      });
    }

  async validate(request: Request, payload: JwtPayloadDecoded) {
    const refreshToken = request?.cookies?.[JWT_REFRESH_TOKEN_COOKIE];
    
    const user = await UserEntity.findOne({
      where: { id: payload.userId, email: payload.email },
    });

    if (!user || !(await compare(refreshToken, user.currentHashedRefreshToken))) 
      throw new UnauthorizedException();

    return user;
  }
}