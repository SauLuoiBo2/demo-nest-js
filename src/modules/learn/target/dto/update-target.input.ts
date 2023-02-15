import { CreateTargetInput } from './create-target.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTargetInput extends PartialType(CreateTargetInput) {
  @Field(() => Int)
  id: number;
}
