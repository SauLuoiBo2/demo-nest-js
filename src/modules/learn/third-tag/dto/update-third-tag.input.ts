import { CreateThirdTagInput } from './create-third-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateThirdTagInput extends PartialType(CreateThirdTagInput) {
  @Field(() => Int)
  id: number;
}
