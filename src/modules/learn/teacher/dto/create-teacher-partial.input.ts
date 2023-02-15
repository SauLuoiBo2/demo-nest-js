import { BasicEntity } from '@common/input/basic-entity';
import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload';
import { IsDateString } from 'class-validator';

@InputType()
export class CreateTeacherPartialInput extends BasicEntity {
  @Field(() => GraphQLUpload, {
    description: 'avatar teacher',
    nullable: true,
  })
  avatar: FileUpload;

  @Field(() => String, { description: 'birthday teacher', nullable: true })
  @IsDateString()
  birthday: string;

  @Field(() => String, { description: 'address teacher', nullable: true })
  address: string;
  @Field(() => String, { description: 'fb_url teacher', nullable: true })
  fb_url: string;
  @Field(() => String, { description: 'tiktok_url teacher', nullable: true })
  tiktok_url: string;
}
