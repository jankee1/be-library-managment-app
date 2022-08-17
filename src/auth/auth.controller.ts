import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {


    @Post()
    async login() {

    }

    @Post()
    async logout() {

    }

    @Post()
    async refresh() {

    }
}
