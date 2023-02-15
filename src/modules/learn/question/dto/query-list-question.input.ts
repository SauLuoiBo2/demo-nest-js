import { FilterByDateInput } from '@common/filter';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsNumber, IsArray } from 'class-validator';

@InputType()
export class QueryListQuestion extends FilterByDateInput {
  @Field({ nullable: true })
  @IsString()
  name: string;
  @Field({ nullable: true })
  @IsNumber()
  teacherId: number;

  @Field({ nullable: true })
  @IsNumber()
  subjectId: number;

  @Field({ nullable: true })
  @IsNumber()
  exerciseId: number;

  @Field(() => [BasicListIdInput], { nullable: true })
  @IsArray()
  thirdTags: BasicListIdInput[];
}

@InputType()
export class QueryListQuestionInput extends PartialType(QueryListQuestion) {}
