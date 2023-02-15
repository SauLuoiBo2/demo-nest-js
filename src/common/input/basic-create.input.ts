import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class BasicCreateInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  description: string;
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  detail: string;
}
