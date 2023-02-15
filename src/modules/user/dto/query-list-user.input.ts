import { FilterByDateInput } from '@common/filter';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class QueryListUser extends FilterByDateInput {
  @Field({ nullable: true })
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsString()
  email?: string;
}

@InputType()
export class QueryListUserInput extends PartialType(QueryListUser) {}
