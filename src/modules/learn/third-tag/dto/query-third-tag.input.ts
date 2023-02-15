import { FilterByBasicInput } from '@common/filter/filter-by-basic.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class QueryListThirdTag extends FilterByBasicInput {
  @Field({ nullable: true })
  @IsNumber()
  secondTagId: number;
}

@InputType()
export class QueryListThirdTagInput extends PartialType(QueryListThirdTag) {}
