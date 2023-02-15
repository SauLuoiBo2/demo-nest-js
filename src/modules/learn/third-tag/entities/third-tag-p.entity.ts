import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ThirdTag as PrismaEntity } from '@prisma/client';

@ObjectType()
export class ThirdTagEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'Slug field' })
  slug: string;
  @Field()
  description: string;
  @Field()
  detail: string;
  @Field(() => Int, { description: 'Id field' })
  order: number;
  @Field()
  updatedAt: Date;
  @Field()
  createdAt: Date;
  @Field()
  secondTagId: number;
}
