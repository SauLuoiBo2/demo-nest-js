import { Exercise } from '@modules/learn/exercise/entities/exercise.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExercisesOn {
  @Field(() => Int, { nullable: true })
  exerciseId: number;

  @Field(() => Exercise, { nullable: true })
  exercise: Exercise;
}
