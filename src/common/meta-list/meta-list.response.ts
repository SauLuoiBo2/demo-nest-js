import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ObjectType()
export class MetaListType {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  lastPage: number;
  @Field(() => Int)
  currentPage: number;
  @Field(() => Int)
  perPage: number;
  @Field(() => Int, { nullable: true })
  prev: number;
  @Field(() => Int, { nullable: true })
  next: number;
}

@ObjectType()
export class MetaList {
  @Field(() => MetaListType)
  meta: MetaListType;
}

@InputType()
export class PaginateInput {
  @Field()
  @IsNumber()
  perPage: number;
  @Field()
  @IsNumber()
  page: number;
  @Field(() => String, { nullable: true })
  createAt: 'asc' | 'desc';
}
