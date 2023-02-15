import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from '../entities/course.entity';

@ObjectType()
export class ListCourseResponse extends MetaList {
  @Field(() => [Course])
  data: Course[];
}
