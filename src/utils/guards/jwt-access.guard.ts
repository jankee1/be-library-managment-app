import { IS_PUBLIC_METADATA_KEY } from './../../../settings';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

export class JwtAccessGuard extends AuthGuard('jwt-access') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_METADATA_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (isPublic) {
        return true;
      }

      return super.canActivate(context);
    }
}
