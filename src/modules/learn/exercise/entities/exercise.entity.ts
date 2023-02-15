import { QuestionOn } from './../../question/entities/question-on.entity';
import { ChapterOn } from './../../chapter/entities/chapter-on.entity';
import { Subject } from '@modules/learn/subject/entities/subject.entity';
import { Teacher } from '@modules/learn/teacher/entities/teacher.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { ExerciseEntity } from './exercise-p.entity';

@ObjectType()
export class Exercise extends ExerciseEntity {
  @Field(() => [ChapterOn], { nullable: true })
  chapters: [ChapterOn];
  @Field(() => [QuestionOn], { nullable: true })
  questions: [QuestionOn];
  @Field(() => Teacher, { nullable: true })
  teacher?: Teacher;
  @Field(() => Subject, { nullable: true })
  subject?: Subject;
}
