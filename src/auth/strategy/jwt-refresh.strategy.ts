import { JWT_SECRET_REFRESH } from './../../../settings';
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
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: JWT_SECRET_REFRESH,
      passReqToCallback: true,
    });
  }
 
  async validate(request: Request, payload) {
    const refreshToken = request.cookies?.Refresh;
    // return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
  }
}