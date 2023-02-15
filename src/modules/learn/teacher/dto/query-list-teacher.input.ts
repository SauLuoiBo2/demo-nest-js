import { FilterByDateInput } from '@common/filter';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class QueryListTeacher extends FilterByDateInput {
  @Field({ nullable: true })
  @IsString()
  name: string;
  @Field(() => [Number], { nullable: true })
  @IsArray()
  subjectId: number[];
}

@InputType()
export class QueryListTeacherInput extends PartialType(QueryListTeacher) {}
