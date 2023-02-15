import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course as PrismaEntity } from '@prisma/client';

@ObjectType()
export class CourseEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'Slug field' })
  slug: string;
  @Field({ description: 'description field' })
  description: string;
  @Field({ description: 'detail field' })
  detail: string;
  @Field({ description: 'content field' })
  content: string;
  @Field(() => Int, { description: 'content field', nullable: true })
  level: number;
  @Field({ description: 'content field', nullable: true })
  thumb: string;
  @Field({ description: 'content field', nullable: true })
  color: string;
  @Field(() => Int, { description: 'content field' })
  totalChapter: number;
  @Field(() => Int, { description: 'content field', nullable: true })
  totalTime: number;
  @Field({ description: 'content field' })
  createdAt: Date;
  @Field({ description: 'content field' })
  updatedAt: Date;
  @Field(() => Int, { description: 'content field' })
  teacherId: number;
}
