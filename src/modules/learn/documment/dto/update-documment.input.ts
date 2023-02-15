import { CreateDocummentInput } from './create-documment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDocummentInput extends PartialType(CreateDocummentInput) {
  @Field(() => Int)
  id: number;
}
