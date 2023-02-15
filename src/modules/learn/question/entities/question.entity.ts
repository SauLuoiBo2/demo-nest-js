import { ExercisesOn } from '@modules/learn/exercise/entities/exercise-on.entity';
import { QuestionOnThirdTag } from './question-on-third-tag.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { QuestionEntity } from './question-p.entity';
import { Teacher } from '@modules/learn/teacher/entities/teacher.entity';
import { Subject } from '@modules/learn/subject/entities/subject.entity';

@ObjectType()
export class Question extends QuestionEntity {
  @Field(() => [QuestionOnThirdTag], { nullable: true })
  thirdTags: [QuestionOnThirdTag];

  @Field(() => [ExercisesOn], { nullable: true })
  exercises: [ExercisesOn];
  @Field(() => Teacher, { nullable: true })
  teacher: Teacher;

  @Field(() => Subject, { nullable: true })
  subject: Subject;
}
