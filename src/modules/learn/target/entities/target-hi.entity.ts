import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Target as TargetP } from '@prisma/client';

@ObjectType()
export class TargetEntity implements TargetP {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'Slug field' })
  slug: string;
  @Field()
  description: string;
  @Field(() => Int, { nullable: true })
  order: number;
  @Field()
  detail: string;

  @Field()
  updatedAt: Date;
  @Field()
  createdAt: Date;
}
