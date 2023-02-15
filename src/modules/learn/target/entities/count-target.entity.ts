import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountTargetEntity {
  @Field(() => Int)
  firstTags: number;
}
