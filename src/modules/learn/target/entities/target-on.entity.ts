import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TargetEntity } from './target-hi.entity';

@ObjectType()
export class TargetOn {
  @Field(() => Int, { nullable: true })
  targetId: number;

  @Field({ nullable: true })
  target: TargetEntity;
}
