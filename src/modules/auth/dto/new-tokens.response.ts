import { SignResponse } from './sign-response';
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class NewTokensResponse extends OmitType(SignResponse, [
  'user',
] as const) {}
