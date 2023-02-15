import { FilterByBasicInput } from '@common/filter/filter-by-basic.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class QueryListSecondTag extends FilterByBasicInput {
  @Field({ nullable: true })
  @IsNumber()
  firstTagId: number;
}

@InputType()
export class QueryListSecondTagInput extends PartialType(QueryListSecondTag) {}
