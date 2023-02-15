import { FilterByBasicInput } from '@common/filter/filter-by-basic.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class QueryListTarget extends FilterByBasicInput {}

@InputType()
export class QueryListTargetInput extends PartialType(QueryListTarget) {}
