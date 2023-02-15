import { CreateFirstTagPartialInput } from './create-first-tag-partial.input';
import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateFirstTagInput extends PartialType(
  CreateFirstTagPartialInput,
) {
  @Field(() => String, { description: 'Name FirstTag' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  subjectId: number;
}
