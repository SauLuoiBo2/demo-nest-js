import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question as PrismaEntity } from '@prisma/client';

@ObjectType()
export class QuestionEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  code: string;
  @Field({ description: 'Name field' })
  name: string;
  @Field(() => Int, { description: 'Id field' })
  level: number;
  @Field({ description: 'Name field' })
  description: string;
  @Field({ description: 'Name field' })
  detail: string;
  @Field({ description: 'Name field' })
  video: string;
  @Field(() => Int, { description: 'Id field' })
  teacherId: number;
  @Field(() => Int, { description: 'Id field' })
  subjectId: number;
  @Field({ description: 'Name field' })
  answerExplain: string;
  @Field({ description: 'Name field' })
  answerVideo: string;
  @Field({ description: 'Name field' })
  createdAt: Date;
  @Field({ description: 'Name field' })
  updatedAt: Date;
}
