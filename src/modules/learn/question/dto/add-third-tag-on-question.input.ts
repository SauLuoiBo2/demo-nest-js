import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AddThirdTagOnQuestionInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  thirdTagId: number;
}
