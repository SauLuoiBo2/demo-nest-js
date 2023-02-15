import { CreateSecondTagInput } from './create-second-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSecondTagInput extends PartialType(CreateSecondTagInput) {
  @Field(() => Int)
  id: number;
}
