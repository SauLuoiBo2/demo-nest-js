import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class SigninInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
