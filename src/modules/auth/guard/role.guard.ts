import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Observable } from 'rxjs';
import { MetaAuthKey, RoleE } from '../role/roles.enum';
import { JwtPayloadI } from '../types';

const { ROLES_KEY } = MetaAuthKey;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get<RoleE[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const user = req.user as JwtPayloadI;
    const { role } = user;

    const isRole = roles.includes(role);

    if (!isRole) {
      throw new GraphQLError('Role error', {
        extensions: { code: 401 },
      });
    }

    return isRole;
  }
}
