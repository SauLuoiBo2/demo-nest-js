import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { FileUpload } from 'graphql-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateCoursePartialInput {
  @Field(() => GraphQLUpload, {
    description: 'thumb course',
    nullable: true,
  })
  thumb: FileUpload;

  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  description: string;
  @Field(() => String, { description: 'description FirstTag', nullable: true })
  @IsString()
  detail: string;
}
