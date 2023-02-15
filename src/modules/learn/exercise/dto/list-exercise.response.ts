import { MetaList } from '@common/meta-list';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exercise } from '../entities/exercise.entity';

@ObjectType()
export class ListExerciseResponse extends MetaList {
  @Field(() => [Exercise])
  data: Exercise[];
}
