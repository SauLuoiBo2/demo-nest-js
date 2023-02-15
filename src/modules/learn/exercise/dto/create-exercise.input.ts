import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateExerciseInput {
  @Field({ description: 'Name field' })
  @IsString()
  name: string;
  @Field({ description: 'Name field' })
  @IsString()
  code: string;
  @Field({ description: 'Name field' })
  @IsString()
  description: string;
  @Field(() => Int, { description: 'Name field', nullable: true })
  @IsNumber()
  teacherId?: number;
  @Field(() => Int, { description: 'Name field' })
  @IsNumber()
  subjectId: number;

  @Field(() => Int, { description: 'Name field' })
  @IsNumber()
  level?: number;
}
