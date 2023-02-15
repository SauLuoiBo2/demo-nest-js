import { BasicCreateInput } from '@common/input/basic-create.input';
import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateChapterInput extends BasicCreateInput {
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  slide: string;
  @Field(() => Int, { description: 'description FirstTag', nullable: true })
  @IsNumber()
  order: number;
  @Field(() => Int, { description: 'description FirstTag', nullable: true })
  @IsNumber()
  time: number;
  @Field(() => Int, { description: 'description FirstTag', nullable: true })
  @IsNumber()
  courseId: number;
}
