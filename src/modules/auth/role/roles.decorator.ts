import { SetMetadata } from '@nestjs/common';
import { RoleE, MetaAuthKey } from './roles.enum';

const { ROLES_KEY } = MetaAuthKey;
export const Roles = (...roles: RoleE[]) => SetMetadata(ROLES_KEY, roles);
