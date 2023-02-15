import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { PaginateInput } from '@common/meta-list';
import { QueryListQuestionInput } from './dto/query-list-question.input';
import { ListQuestionResponse } from './dto/list-question.response';
import { Public } from 'src/modules/auth/role/public.decorator';
import { BasicListIdInput } from '@common/input/basic-list-id.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  @Public()
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
    @Args({
      name: 'addThirdTagOnQuestionInput',
      type: () => [BasicListIdInput],
      nullable: true,
      defaultValue: [],
    })
    addThirdTagOnQuestionInput: BasicListIdInput[],
  ) {
    return this.questionService.create(
      createQuestionInput,
      addThirdTagOnQuestionInput,
    );
  }

  @Query(() => ListQuestionResponse, { name: 'questions' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListQuestionInput')
    queryListQuestionInput: QueryListQuestionInput,
  ) {
    return this.questionService.findAll(paginateInput, queryListQuestionInput);
  }

  @Query(() => Question, { name: 'question' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  @Public()
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question)
  @Public()
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }
}
