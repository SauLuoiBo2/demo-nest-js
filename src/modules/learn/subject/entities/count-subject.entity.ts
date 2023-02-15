import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountSubjectEntity {
  @Field(() => Int)
  teachers: number;
  @Field(() => Int)
  firstTags: number;
  @Field(() => Int)
  questions: number;
  @Field(() => Int)
  exercises: number;
}
