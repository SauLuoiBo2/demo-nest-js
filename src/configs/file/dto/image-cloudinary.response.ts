import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImageCloudinaryResponse {
  @Field({ nullable: true })
  asset_id: string;
  @Field({ nullable: true })
  public_id: string;
  @Field({ nullable: true })
  format: string;
  @Field(() => Int, { nullable: true })
  version: number;
  @Field({ nullable: true })
  resource_type: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  created_at: Date;
  @Field(() => Int, { nullable: true })
  bytes: number;
  @Field(() => Int, { nullable: true })
  width: number;
  @Field(() => Int, { nullable: true })
  height: number;
  @Field({ nullable: true })
  folder: string;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  secure_url: string;
}
