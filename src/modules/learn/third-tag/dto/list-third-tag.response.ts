import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { ThirdTag } from '../entities/third-tag.entity';

@ObjectType()
export class ListThirdTagResponse extends MetaList {
  @Field(() => [ThirdTag])
  data: ThirdTag[];
}
