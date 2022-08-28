import { JwtPayloadDecoded } from './../../types/auth/jwt.payload';
import { JWT_REFRESH_TOKEN_COOKIE, JWT_SECRET_ACCESS_TOKEN } from './../../../settings';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
          return request?.cookies?.[JWT_REFRESH_TOKEN_COOKIE];
        }]),
        secretOrKey: JWT_SECRET_ACCESS_TOKEN,
        passReqToCallback: true,
        ignoreExpiration: false,
      });
    }

  async validate(request: Request, payload: JwtPayloadDecoded) {
    console.log(payload)
    const refreshToken = request.cookies?.[JWT_REFRESH_TOKEN_COOKIE];
    // return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
  }
}