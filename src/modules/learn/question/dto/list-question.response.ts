import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { Question } from '../entities/question.entity';

@ObjectType()
export class ListQuestionResponse extends MetaList {
  @Field(() => [Question])
  data: Question[];
}
