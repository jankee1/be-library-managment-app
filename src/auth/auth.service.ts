import { UserEntity } from './../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {

    async validateUser(email: string, pass: string): Promise<any> {
        const user: UserEntity = await UserEntity.findOne({where: {email}})

        if (user && await compare(pass, user.passwordHash)) {
          const { passwordHash, ...result } = user;
          return result;
        }

        throw new UnauthorizedException();
    }


    async login() {

    }


    async logout() {

    }


    async refresh() {

    }
}
