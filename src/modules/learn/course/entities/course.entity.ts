import { Chapter } from '@modules/learn/chapter/entities/chapter.entity';
import { FirstTagOn } from '@modules/learn/first-tag/entities/first-tag-on.entity';
import { Teacher } from '@modules/learn/teacher/entities/teacher.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { CourseEntity } from './course-p.entity';

@ObjectType()
export class Course extends CourseEntity {
  @Field(() => Teacher, { nullable: true })
  teacher: Teacher;

  @Field(() => [Chapter], { nullable: true })
  chapters: [Chapter];

  @Field(() => [FirstTagOn], { nullable: true })
  firstTags: [FirstTagOn];
}
