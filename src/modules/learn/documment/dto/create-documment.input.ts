import { InputType, Field } from '@nestjs/graphql';
import { BasicCreateInput } from './../../../../common/input/basic-create.input';
import { IsString } from 'class-validator';

@InputType()
export class CreateDocummentInput extends BasicCreateInput {
  @Field({ description: 'Example field (placeholder)' })
  @IsString()
  url: string;
}
