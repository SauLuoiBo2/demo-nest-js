import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Chapter as PrismaEntity } from '@prisma/client';

@ObjectType()
export class ChapterEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'Slug field' })
  slug: string;
  @Field({ description: 'description field', nullable: true })
  description: string;
  @Field({ description: 'detail field', nullable: true })
  detail: string;
  @Field({ description: 'video', nullable: true })
  video: string;
  @Field({ description: 'detail field', nullable: true })
  slide: string;
  @Field(() => Int, { description: 'detail field' })
  order: number;
  @Field(() => Int, { description: 'detail field', nullable: true })
  time: number;
  @Field({ description: 'detail field' })
  createdAt: Date;
  @Field({ description: 'detail field' })
  updatedAt: Date;
  @Field(() => Int, { description: 'content field' })
  courseId: number;
}
