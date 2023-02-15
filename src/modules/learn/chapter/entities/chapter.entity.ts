import { Course } from '@modules/learn/course/entities/course.entity';
import { DocummentOn } from '@modules/learn/documment/entities/documment-on.entity';
import { ExercisesOn } from '@modules/learn/exercise/entities/exercise-on.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { ChapterEntity } from './chapter-p.entity';

@ObjectType()
export class Chapter extends ChapterEntity {
  @Field(() => Course, { nullable: true })
  course: Course;
  @Field(() => [ExercisesOn], { nullable: true })
  exercises: [ExercisesOn];

  @Field(() => [DocummentOn], { nullable: true })
  documments: [DocummentOn];
}
