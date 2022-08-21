import { JwtPayload } from './../types/auth/jwt.payload';
import { JwtTokens } from '../types/auth/jwt.tokens';
import { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH, JWT_SECRET_REFRESH_EXPIRATION, JWT_SECRET_ACCESS_EXPIRATION } from './../../settings';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
      const user = await this.validateUser(loginDto.email, loginDto.password)
      const payload = { userId: user.id, email: user.email};
      const tokens = await this.generateNewTokens(payload)

      user.currentHashedAccessToken = await hash(tokens.accessToken, 10)
      user.currentHashedRefreshToken = await hash(tokens.refreshToken, 10)

      await user.save()

      return {
        access_token: this.jwtService.sign(payload),
      };
  }


    async logout() {

    }


    async refresh() {

    }

    async generateNewTokens(payload: JwtPayload): Promise<JwtTokens> {
      return  {
        accessToken: this.jwtService.sign(payload, {
          secret: JWT_SECRET_ACCESS,
          expiresIn: JWT_SECRET_ACCESS_EXPIRATION,
        }),
        refreshToken: this.jwtService.sign(payload, {
          secret: JWT_SECRET_REFRESH,
          expiresIn: JWT_SECRET_REFRESH_EXPIRATION,
        })
      }
    }


    async validateUser(email: string, pass: string): Promise<any> {
      const user: UserEntity = await UserEntity.findOne({where: {email}})

      if (user && await compare(pass, user.passwordHash)) {
        const { passwordHash, currentHashedAccessToken, currentHashedRefreshToken, ...result } = user;
        return result;
      }

      throw new UnauthorizedException("email or password is incorrect");
  }


}
