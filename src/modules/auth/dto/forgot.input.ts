import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class ForgotInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
