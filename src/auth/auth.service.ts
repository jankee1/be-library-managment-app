import { LoginResponse } from './../types/auth/login.response';
import { JwtPayload } from './../types/auth/jwt.payload';
import { JwtTokens } from '../types/auth/jwt.tokens';
import { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN, JWT_SECRET_REFRESH_EXPIRATION, JWT_SECRET_ACCESS_EXPIRATION, JWT_REFRESH_TOKEN_COOKIE } from './../../settings';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) {}

    // core methods

    async login(res: Response, loginDto: LoginDto): Promise <LoginResponse> {
      const user = await this.validateUser(loginDto.email, loginDto.password)

      const payload = { userId: user.id, email: user.email} as JwtPayload;
      const tokens = await this.generateNewTokens(payload)

      user.currentHashedRefreshToken = await hash(tokens.refreshToken, 10)

      await user.save()

      this.setRefreshCookieSecureAndHttpOnly(res, tokens.refreshToken)

      return {
        ...this.filterUserData(user),
        jwtAccessToken: tokens.accessToken
      };
    }

    async logout() {

    }


    async refresh(res: Response, user: UserEntity): Promise <LoginResponse> {
        const { accessToken, refreshToken } = await this.generateNewTokens({
          userId: user.id,
          email: user.email
        });
        user.currentHashedRefreshToken = await hash(refreshToken,10)
        await user.save();
        this.setRefreshCookieSecureAndHttpOnly(res, refreshToken);
        return { ...this.filterUserData(user), jwtAccessToken: accessToken };
    }

    // helper methods

    async generateNewTokens(payload: JwtPayload): Promise<JwtTokens> {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.sign(payload, {
          secret: JWT_SECRET_ACCESS_TOKEN,
          expiresIn: `${JWT_SECRET_ACCESS_EXPIRATION}ms`
        }),
        this.jwtService.sign(payload, {
          secret: JWT_SECRET_REFRESH_TOKEN,
          expiresIn: `${JWT_SECRET_REFRESH_EXPIRATION}ms`,
        }),
      ]);

      return { accessToken, refreshToken };
    }

    filterUserData(user: UserEntity) {
      const { passwordHash, currentHashedRefreshToken, ...result } = user;
      return result;
    }


    async validateUser(email: string, pass: string): Promise<UserEntity> {
      const user: UserEntity = await UserEntity.findOne({where: {email}})

      if (user && await compare(pass, user.passwordHash)) {
        return user;
      }

      throw new UnauthorizedException("email or password is incorrect");
    }

    setRefreshCookieSecureAndHttpOnly(res: Response, refreshToken: string): void {
      res.cookie(JWT_REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: JWT_SECRET_REFRESH_EXPIRATION,
      });
    }
}
