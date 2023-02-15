import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { Chapter } from '../entities/chapter.entity';

@ObjectType()
export class ListChapterResponse extends MetaList {
  @Field(() => [Chapter])
  data: Chapter[];
}
