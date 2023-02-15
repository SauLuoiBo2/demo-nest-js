import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Documment as PrismaEntity } from '@prisma/client';

@ObjectType()
export class DocummentEntity implements PrismaEntity {
  @Field(() => Int, { description: 'Id field' })
  id: number;
  @Field({ description: 'Name field' })
  name: string;
  @Field({ description: 'description field' })
  description: string;
  @Field({ description: 'detail field' })
  detail: string;
  @Field({ description: 'url field' })
  url: string;
  @Field({ description: 'createdAt field' })
  createdAt: Date;
  @Field({ description: 'updatedAt field' })
  updatedAt: Date;
}
