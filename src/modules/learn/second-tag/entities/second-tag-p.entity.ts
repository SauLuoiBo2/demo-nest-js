import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SecondTag as PrismaEntity } from '@prisma/client';

@ObjectType()
export class SecondTagEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'Slug field' })
  slug: string;

  @Field(() => Int, { description: 'Name field' })
  order: number;
  @Field()
  description: string;
  @Field()
  detail: string;

  @Field()
  updatedAt: Date;
  @Field()
  createdAt: Date;
  @Field()
  firstTagId: number;
}
