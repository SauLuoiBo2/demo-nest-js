import { Teacher } from './../entities/teacher.entity';
import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListTeacherResponse extends MetaList {
  @Field(() => [Teacher])
  data: Teacher[];
}
