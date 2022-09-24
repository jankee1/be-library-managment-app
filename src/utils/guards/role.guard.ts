import { ACCESS_ROLE_METADATA_KEY } from './../../../settings';
import { UserEntity } from '../../user/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserEntity
    const accessRoles = this.reflector.getAllAndOverride<number[]>(
        ACCESS_ROLE_METADATA_KEY,
        [context.getHandler(), context.getClass()],
    );

    if (!user || !accessRoles || accessRoles.length === 0) return true;
    
    return accessRoles.includes(user.role);
  }
}
