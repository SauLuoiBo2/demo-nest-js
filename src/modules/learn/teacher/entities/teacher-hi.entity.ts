import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TeacherHi {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field()
  slug: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  birthday: string;
  @Field({ nullable: true })
  address: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  detail: string;
  @Field({ nullable: true })
  avatar: string;
  @Field(() => Int, { nullable: true })
  order: number;
  @Field({ nullable: true })
  fb_url: string;
  @Field({ nullable: true })
  tiktok_url: string;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
}
