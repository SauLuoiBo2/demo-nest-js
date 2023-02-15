import { Field, ObjectType } from '@nestjs/graphql';
import { Auth } from '../entities/auth.entity';

@ObjectType()
export class SignResponse {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
  @Field()
  expiredAt: number;
  @Field(() => Auth)
  user: Auth;
}
