import { FirstTag } from '@modules/learn/first-tag/entities/first-tag.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FirstTagOn {
  @Field(() => Int, { nullable: true })
  firstTagId: number;

  @Field(() => FirstTag, { nullable: true })
  firstTag: FirstTag;
}
