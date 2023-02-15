import { FirstTag } from '@modules/learn/first-tag/entities/first-tag.entity';
import { ThirdTagEntity } from '@modules/learn/third-tag/entities/third-tag-p.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { CountSecondTagEntity } from './count-second-tag.entity';
import { SecondTagEntity } from './second-tag-p.entity';

@ObjectType()
export class SecondTag extends SecondTagEntity {
  @Field(() => FirstTag, { nullable: true })
  firstTag: FirstTag;

  @Field(() => [ThirdTagEntity], { nullable: true })
  thirdTags: [ThirdTagEntity];

  @Field(() => CountSecondTagEntity, { nullable: true })
  _count: CountSecondTagEntity;
}
