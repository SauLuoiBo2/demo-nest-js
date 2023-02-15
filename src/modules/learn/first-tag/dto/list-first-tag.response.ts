import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { FirstTag } from '../entities/first-tag.entity';

@ObjectType()
export class ListFirstTagResponse extends MetaList {
  @Field(() => [FirstTag])
  data: FirstTag[];
}
