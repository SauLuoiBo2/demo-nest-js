import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FirstTagService } from './first-tag.service';
import { FirstTag } from './entities/first-tag.entity';
import { CreateFirstTagInput } from './dto/create-first-tag.input';
import { UpdateFirstTagInput } from './dto/update-first-tag.input';
import { Public } from '@modules/auth/role/public.decorator';
import { QueryListFirstTagInput } from './dto/query-list-first-tag.input';
import { PaginateInput } from '@common/meta-list';
import { ListFirstTagResponse } from './dto/list-first-tag.response';
import { BasicListIdInput } from '@common/input/basic-list-id.input';

@Resolver(() => FirstTag)
export class FirstTagResolver {
  constructor(private readonly firstTagService: FirstTagService) {}

  @Mutation(() => FirstTag)
  @Public()
  createFirstTag(
    @Args('createFirstTagInput') createFirstTagInput: CreateFirstTagInput,
    @Args({
      name: 'addTargetOnFirstTagInput',
      type: () => [BasicListIdInput],
      nullable: true,
      defaultValue: [],
    })
    addTargetOnFirstTagInput: BasicListIdInput[],
  ) {
    return this.firstTagService.create(
      createFirstTagInput,
      addTargetOnFirstTagInput,
    );
  }

  @Query(() => ListFirstTagResponse, { name: 'firstTags' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListFirstTagInput', { nullable: true })
    queryListFirstTagInput: QueryListFirstTagInput,
  ) {
    return this.firstTagService.findAll(paginateInput, queryListFirstTagInput);
  }

  @Query(() => [FirstTag], { name: 'firstTagsBySubject' })
  @Public()
  findManyBySubject(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    return this.firstTagService.findManyBySubjectId(id);
  }

  @Query(() => FirstTag, { name: 'firstTag' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.firstTagService.findOne(id);
  }

  @Mutation(() => FirstTag)
  @Public()
  updateFirstTag(
    @Args('updateFirstTagInput') updateFirstTagInput: UpdateFirstTagInput,
    @Args({
      name: 'addTargetOnFirstTagInput',
      type: () => [BasicListIdInput],
      nullable: true,
    })
    addTargetOnFirstTagInput: BasicListIdInput[],
  ) {
    return this.firstTagService.update(
      updateFirstTagInput.id,
      updateFirstTagInput,
      addTargetOnFirstTagInput,
    );
  }

  @Mutation(() => FirstTag)
  @Public()
  removeFirstTag(@Args('id', { type: () => Int }) id: number) {
    return this.firstTagService.remove(id);
  }
}
