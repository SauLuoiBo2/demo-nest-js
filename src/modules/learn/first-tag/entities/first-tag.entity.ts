import { ObjectType, Field } from '@nestjs/graphql';
import { FirstTagEntity } from './first-tag-hi.entity';
import { Subject } from '@modules/learn/subject/entities/subject.entity';
import { SecondTag } from '@modules/learn/second-tag/entities/second-tag.entity';
import { CourseOn } from '@modules/learn/course/entities/course-on.entity';
import { TargetOn } from '@modules/learn/target/entities/target-on.entity';
import { CountFirstTagEntity } from './count-first-tag.entity';

@ObjectType()
export class FirstTag extends FirstTagEntity {
  @Field(() => [TargetOn], { nullable: true })
  targets: [TargetOn];
  @Field(() => Subject, { nullable: true })
  subject: Subject;

  @Field(() => [SecondTag], { nullable: true })
  secondTags: [SecondTag];
  @Field(() => [CourseOn], { nullable: true })
  courses: [CourseOn];
  @Field(() => CountFirstTagEntity, { nullable: true })
  _count: CountFirstTagEntity;
}
