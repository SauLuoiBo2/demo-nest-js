import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Subject as SubjectP } from '@prisma/client';

@ObjectType()
export class SubjectHi implements SubjectP {
  @Field(() => Int)
  id: number;
  @Field()
  slug: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  code: string;
  @Field(() => Int, { nullable: true })
  order: number;
  @Field({ nullable: true })
  updatedAt: Date;
  @Field({ nullable: true })
  createdAt: Date;
}
