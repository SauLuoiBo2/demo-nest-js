import { JwtPayloadI } from './../types/index';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const user = req.user as JwtPayloadI;

    return user.userId;
  },
);
