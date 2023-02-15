import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { CreateCoursePartialInput } from './create-course-partial.input';

@InputType()
export class CreateCourseInput extends PartialType(CreateCoursePartialInput) {
  // @Field({ description: 'Example field (placeholder)' })
  // @IsString()
  // content: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @Field({ description: 'Example field (placeholder)' })
  @IsNumber()
  @Min(0)
  @Max(5)
  level: number;
  @Field({ description: 'Example field (placeholder)' })
  @IsString()
  color: string;
  @Field({ description: 'Example field (placeholder)' })
  @IsNumber()
  totalTime: number;
  @Field({ description: 'Example field (placeholder)' })
  @IsNumber()
  teacherId: number;
}
