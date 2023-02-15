import { CreateSubjectInput } from './create-subject.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
