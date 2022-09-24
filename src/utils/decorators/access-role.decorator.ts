import { ACCESS_ROLE_METADATA_KEY } from './../../../settings';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../types';

export const AccessRole = (...accessRoles: UserRole[]) =>
  SetMetadata(ACCESS_ROLE_METADATA_KEY, accessRoles);
