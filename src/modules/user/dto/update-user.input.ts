import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  oldPassword?: string;
  @Field({ nullable: true })
  forgotToken?: string;
}

@InputType()
export class UpdateProfileInput extends OmitType(UpdateUserInput, [
  'id',
] as const) {}
