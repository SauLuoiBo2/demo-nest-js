import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

@InputType()
export class FilterByDateInput {
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
