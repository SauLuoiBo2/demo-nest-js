import { Question } from '@modules/learn/question/entities/question.entity';
import { SecondTag } from '@modules/learn/second-tag/entities/second-tag.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { ThirdTagEntity } from './third-tag-p.entity';

@ObjectType()
export class ThirdTag extends ThirdTagEntity {
  @Field(() => SecondTag, { nullable: true })
  secondTag: SecondTag;
  @Field(() => [Question], { nullable: true })
  questions: [Question];
}
