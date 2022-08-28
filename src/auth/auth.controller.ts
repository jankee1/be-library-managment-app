import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() loginDto: LoginDto,
    ) {
        return await this.authService.login(res, loginDto)
    }

    @Post('logout')
    async logout() {

    }

    @Post('refresh')
    async refresh() {

    }
}
