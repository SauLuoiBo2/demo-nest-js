import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountTeacherEntity {
  @Field(() => Int)
  subjects: number;
  @Field(() => Int)
  courses: number;
  @Field(() => Int)
  questions: number;
  @Field(() => Int)
  exercises: number;
}
