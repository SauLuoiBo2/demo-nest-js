import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class BasicListIdInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
