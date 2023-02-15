import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountSecondTagEntity {
  @Field(() => Int, { nullable: true })
  thirdTags: number;
}
