import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int, { description: 'Id user' })
  userId: number;
  @Field(() => String, { description: 'Email user' })
  email: string;
  @Field(() => String, { description: 'Role user' })
  role: string;
}
