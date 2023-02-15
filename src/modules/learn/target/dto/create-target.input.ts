import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateTargetPartialInput } from './create-target-partial.input';

@InputType()
export class CreateTargetInput extends PartialType(CreateTargetPartialInput) {
  @Field(() => String, { description: 'Name Target' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
}
