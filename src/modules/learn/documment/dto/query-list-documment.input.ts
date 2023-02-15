import { FilterByBasicInput } from '@common/filter/filter-by-basic.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class QueryListDocumment extends FilterByBasicInput {}

@InputType()
export class QueryListDocummentInput extends PartialType(QueryListDocumment) {}
