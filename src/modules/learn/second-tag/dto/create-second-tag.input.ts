import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateSecondTagPartialInput } from './create-second-tag-partial.input';

@InputType()
export class CreateSecondTagInput extends PartialType(
  CreateSecondTagPartialInput,
) {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  firstTagId: number;
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
}
