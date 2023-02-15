import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SubjectHi } from './subject-hi.entity';

@ObjectType()
export class SubjectOn {
  @Field(() => SubjectHi, { nullable: true })
  subject: SubjectHi;
  @Field(() => Int, { nullable: true })
  subjectId: number;
}
