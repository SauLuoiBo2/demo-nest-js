import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from './question.entity';

@ObjectType()
export class QuestionOn {
  @Field(() => Int, { nullable: true })
  questionId: number;

  @Field(() => Question, { nullable: true })
  question: Question;
}
