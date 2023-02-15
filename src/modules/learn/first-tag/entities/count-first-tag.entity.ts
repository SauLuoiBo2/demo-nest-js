import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountFirstTagEntity {
  @Field(() => Int)
  targets: number;
  @Field(() => Int)
  secondTags: number;
  @Field(() => Int)
  courses: number;
}
