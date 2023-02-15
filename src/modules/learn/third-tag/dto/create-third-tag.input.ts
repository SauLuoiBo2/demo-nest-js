import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateThirdTagPartialInput } from './create-third-tag-partial.input';

@InputType()
export class CreateThirdTagInput extends PartialType(
  CreateThirdTagPartialInput,
) {
  @Field(() => String, { description: 'Name ThirdTag' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  secondTagId: number;
}
