import { InputType, Field } from '@nestjs/graphql';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { StatusE } from './../../auth/status/status.enum';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload';

@InputType()
export class CreateUserPartialInput {
  @Field(() => GraphQLUpload, { description: 'avatar user', nullable: true })
  avatar?: FileUpload;
  @Field({ nullable: true })
  role?: RoleE;
  @Field({ nullable: true })
  status?: StatusE;
}
