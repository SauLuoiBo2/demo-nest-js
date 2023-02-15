import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exercise as PrismaEntity } from '@prisma/client';

@ObjectType()
export class ExerciseEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  code: string;

  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'Name field' })
  description: string;
  @Field(() => Int, { description: 'Name field' })
  teacherId: number;
  @Field(() => Int, { description: 'Name field' })
  subjectId: number;
  @Field(() => Int, { description: 'Name field' })
  level: number;

  @Field({ description: 'Name field' })
  createdAt: Date;
  @Field({ description: 'Name field' })
  updatedAt: Date;
}
