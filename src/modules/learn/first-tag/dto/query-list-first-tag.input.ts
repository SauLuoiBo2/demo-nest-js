import { FilterByBasicInput } from '@common/filter/filter-by-basic.input';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';

@InputType()
export class QueryListFirstTag extends FilterByBasicInput {
  @Field({ nullable: true })
  @IsNumber()
  subjectId: number;
  @Field(() => [BasicListIdInput], { nullable: true })
  @IsArray()
  targets: BasicListIdInput[];
}

@InputType()
export class QueryListFirstTagInput extends PartialType(QueryListFirstTag) {}
