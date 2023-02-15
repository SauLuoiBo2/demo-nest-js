import { CountSubjectEntity } from './count-subject.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { SubjectHi } from './subject-hi.entity';
import { FirstTag } from '@modules/learn/first-tag/entities/first-tag.entity';
import { TeacherOn } from '@modules/learn/teacher/entities/teacher-on.entity';

@ObjectType()
export class Subject extends SubjectHi {
  @Field(() => [TeacherOn], { nullable: true })
  teachers: [TeacherOn];
  @Field(() => [FirstTag], { nullable: true })
  firstTags: [FirstTag];
  @Field(() => CountSubjectEntity, { nullable: true })
  _count: CountSubjectEntity;
}
