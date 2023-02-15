import { ThirdTag } from '@modules/learn/third-tag/entities/third-tag.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionOnThirdTag as PrismaP } from '@prisma/client';
import { Question } from './question.entity';

@ObjectType()
export class QuestionOnThirdTag implements PrismaP {
  @Field(() => Int, { nullable: true })
  questionId: number;
  @Field(() => Int, { nullable: true })
  thirdTagId: number;
  @Field(() => Question, { nullable: true })
  question: Question;
  @Field(() => ThirdTag, { nullable: true })
  thirdTag: ThirdTag;
}
