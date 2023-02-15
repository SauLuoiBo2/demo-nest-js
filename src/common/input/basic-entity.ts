import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class BasicEntity {
  @Field(() => Int, { description: 'birthday teacher', nullable: true })
  @Min(1)
  @IsNumber()
  order: number;
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  description: string;
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  detail: string;
}
