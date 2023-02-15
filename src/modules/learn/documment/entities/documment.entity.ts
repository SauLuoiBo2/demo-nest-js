import { DocummentEntity } from './documment-p.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { ChapterOn } from '@modules/learn/chapter/entities/chapter-on.entity';

@ObjectType()
export class Documment extends DocummentEntity {
  @Field(() => [ChapterOn], { nullable: true })
  chapters: [ChapterOn];
}
