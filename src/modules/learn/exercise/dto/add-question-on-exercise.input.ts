import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class AddQuestionOnExerciseInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  questionId: number;
}
