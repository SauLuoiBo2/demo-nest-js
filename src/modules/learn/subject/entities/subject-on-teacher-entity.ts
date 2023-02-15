import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SubjectOnTeacherHi {
  @Field({ nullable: true })
  teacherId: number;
  @Field({ nullable: true })
  subjectId: number;
}
