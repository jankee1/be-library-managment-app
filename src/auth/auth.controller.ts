import { LogoutResponse } from './../types/auth/logout.response';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginResponse } from './../types/auth/login.response';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GetUser, IsPublic, JwtRefreshGuard } from 'src/utils';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @IsPublic()
    @Post('login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() loginDto: LoginDto,
    ): Promise <LoginResponse> {
        return await this.authService.login(res, loginDto)
    }

    @Get('logout')
    async logout(
        @Res({ passthrough: true }) res: Response,
        @GetUser() user: UserEntity,
    ): Promise<LogoutResponse>  {
        return this.authService.logout(res, user)
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refresh(
        @Res({ passthrough: true }) res: Response,
        @GetUser() user: UserEntity,
    ): Promise <LoginResponse> {
        return await this.authService.refresh(res, user)
    }
}
