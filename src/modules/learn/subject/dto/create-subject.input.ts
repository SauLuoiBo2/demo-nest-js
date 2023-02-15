import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateSubjectInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  code: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  order: number;
}
