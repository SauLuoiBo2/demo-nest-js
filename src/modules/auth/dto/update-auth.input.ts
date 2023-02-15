import { SigninInput } from './signin.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(SigninInput) {
  @Field(() => Int)
  id: number;
}
