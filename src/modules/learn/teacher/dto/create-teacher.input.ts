import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateTeacherPartialInput } from './create-teacher-partial.input';

@InputType()
export class CreateTeacherInput extends PartialType(CreateTeacherPartialInput) {
  @Field(() => String, { description: 'Name teacher' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  name: string;
}
