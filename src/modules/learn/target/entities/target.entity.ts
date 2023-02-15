import { FirstTagOn } from '@modules/learn/first-tag/entities/first-tag-on.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { CountTargetEntity } from './count-target.entity';

import { TargetEntity } from './target-hi.entity';

@ObjectType()
export class Target extends TargetEntity {
  @Field(() => [FirstTagOn])
  firstTags: [FirstTagOn];
  @Field(() => CountTargetEntity, { nullable: true })
  _count: CountTargetEntity;
}
