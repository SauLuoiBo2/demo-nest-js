import { FilterByDateInput } from '@common/filter';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class QueryListChapter extends FilterByDateInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  courseId: number;
}

@InputType()
export class QueryListChapterInput extends PartialType(QueryListChapter) {}
