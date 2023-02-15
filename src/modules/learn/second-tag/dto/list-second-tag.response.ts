import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { SecondTag } from '../entities/second-tag.entity';

@ObjectType()
export class ListSecondTagResponse extends MetaList {
  @Field(() => [SecondTag])
  data: SecondTag[];
}
