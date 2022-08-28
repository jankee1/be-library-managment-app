import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

export class JwtAccessGuard extends AuthGuard('jwt-access') {
    constructor(private readonly reflector: Reflector) {
        super();
      }
}
