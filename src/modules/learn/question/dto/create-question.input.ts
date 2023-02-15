import { InputType, Int, Field } from '@nestjs/graphql';
import { BasicCreateInput } from '@common/input/basic-create.input';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput extends BasicCreateInput {
  @Field(() => String, { description: 'description FirstTag' })
  @IsString()
  code: string;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumber()
  level: number;
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  video?: string;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumber()
  teacherId: number;
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumber()
  subjectId: number;
  @Field({ description: 'answer Explain field', nullable: true })
  @IsString()
  answerExplain?: string;
  @Field({ description: 'answer Video field', nullable: true })
  @IsString()
  answerVideo?: string;
}
