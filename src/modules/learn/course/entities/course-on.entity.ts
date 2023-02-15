import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from './course.entity';

@ObjectType()
export class CourseOn {
  @Field(() => Int, { nullable: true })
  courseId: number;

  @Field(() => Course, { nullable: true })
  course: Course;
}
