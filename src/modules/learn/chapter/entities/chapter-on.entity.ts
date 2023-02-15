import { Chapter } from './chapter.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChapterOn {
  @Field(() => Int, { nullable: true })
  chapterId: number;

  @Field(() => Chapter, { nullable: true })
  chapter: Chapter;
}
