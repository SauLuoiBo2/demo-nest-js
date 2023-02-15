import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { PaginateInput } from '@common/meta-list';
import { QueryListExerciseInput } from './dto/query-list-exercise.input';
import { AddQuestionOnExerciseInput } from './dto/add-question-on-exercise.input';
import { ListExerciseResponse } from './dto/list-exercise.response';
import { Public } from 'src/modules/auth/role/public.decorator';

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise)
  @Public()
  createExercise(
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
    @Args({
      name: 'addQuestionOnExerciseInput',
      type: () => [AddQuestionOnExerciseInput],
      nullable: true,
      defaultValue: [],
    })
    addQuestionOnExerciseInput: AddQuestionOnExerciseInput[],
  ) {
    return this.exerciseService.create(
      createExerciseInput,
      addQuestionOnExerciseInput,
    );
  }

  @Query(() => ListExerciseResponse, { name: 'exercises' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListExerciseInput')
    queryListExerciseInput: QueryListExerciseInput,
  ) {
    return this.exerciseService.findAll(paginateInput, queryListExerciseInput);
  }

  @Query(() => Exercise, { name: 'exercise' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseService.findOne(id);
  }

  @Mutation(() => Exercise)
  @Public()
  updateExercise(
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
  ) {
    return this.exerciseService.update(
      updateExerciseInput.id,
      updateExerciseInput,
    );
  }

  @Mutation(() => Exercise)
  @Public()
  removeExercise(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseService.remove(id);
  }
}
