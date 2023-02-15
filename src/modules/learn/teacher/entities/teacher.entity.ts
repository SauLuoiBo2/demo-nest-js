import { CountTeacherEntity } from './count-teacher.entity';
import { Exercise } from '@modules/learn/exercise/entities/exercise.entity';
import { Question } from '@modules/learn/question/entities/question.entity';
import { SubjectOn } from '@modules/learn/subject/entities/subject-on';
import { ObjectType, Field } from '@nestjs/graphql';
import { TeacherHi } from './teacher-hi.entity';

@ObjectType()
export class Teacher extends TeacherHi {
  @Field(() => [SubjectOn], { nullable: true })
  subjects: [SubjectOn];

  @Field(() => [Question], { nullable: true })
  questions: [Question];

  @Field(() => [Exercise], { nullable: true })
  exercises: [Exercise];

  @Field(() => CountTeacherEntity, { nullable: true })
  _count: CountTeacherEntity;
}
