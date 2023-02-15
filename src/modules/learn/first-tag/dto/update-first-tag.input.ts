import { CreateFirstTagInput } from './create-first-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFirstTagInput extends PartialType(CreateFirstTagInput) {
  @Field(() => Int)
  id: number;
}
