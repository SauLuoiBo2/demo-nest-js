import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDate } from 'class-validator';

@InputType()
export class FilterByBasicInput {
  @Field({ nullable: true })
  @IsString()
  name: string;
  @Field({ nullable: true })
  @IsDate()
  startDate?: Date;
  @Field({ nullable: true })
  @IsDate()
  endDate?: Date;
}
