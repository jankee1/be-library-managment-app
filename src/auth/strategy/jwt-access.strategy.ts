import { UserEntity } from './../../user/entities/user.entity';
import { JwtPayloadDecoded } from './../../types/auth/jwt.payload';
import { JWT_SECRET_ACCESS_TOKEN } from './../../../settings';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {

  secondMultiplier:number = 1000 // 1000ms = 1s

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_ACCESS_TOKEN,
    });
  }
 
  async validate(payload: JwtPayloadDecoded): Promise<UserEntity> {
    const expiration = payload.exp * this.secondMultiplier;
    if (expiration < Date.now()) {
      throw new ForbiddenException('access token is expired');
    }

    const user = await UserEntity.findOne({
      where: { id: payload.userId, email: payload.email },
    });

    if (!user) 
      throw new UnauthorizedException();
    
    return user;
  }

}