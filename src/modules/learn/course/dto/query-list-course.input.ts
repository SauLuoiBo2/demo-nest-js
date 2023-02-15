import { FilterByDateInput } from '@common/filter';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class QueryListCourse extends FilterByDateInput {
  @Field(() => [BasicListIdInput], { nullable: true })
  @IsArray()
  teachers: BasicListIdInput[];

  @Field(() => [BasicListIdInput], { nullable: true })
  @IsArray()
  firstTags: BasicListIdInput[];
}

@InputType()
export class QueryListCourseInput extends PartialType(QueryListCourse) {}
