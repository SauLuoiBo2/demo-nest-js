import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SecondTagService } from './second-tag.service';
import { SecondTag } from './entities/second-tag.entity';
import { CreateSecondTagInput } from './dto/create-second-tag.input';
import { UpdateSecondTagInput } from './dto/update-second-tag.input';
import { Public } from '@modules/auth/role/public.decorator';
import { ListSecondTagResponse } from './dto/list-second-tag.response';
import { PaginateInput } from '@common/meta-list';
import { QueryListSecondTagInput } from './dto/query-list-second-tag.input';

@Resolver(() => SecondTag)
export class SecondTagResolver {
  constructor(private readonly secondTagService: SecondTagService) {}

  @Mutation(() => SecondTag)
  @Public()
  createSecondTag(
    @Args({
      name: 'createSecondTagInput',
      type: () => CreateSecondTagInput,
    })
    createSecondTagInput: CreateSecondTagInput,
  ) {
    return this.secondTagService.create(createSecondTagInput);
  }

  @Query(() => ListSecondTagResponse, { name: 'secondTags' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListSecondTagInput')
    queryListSecondTagInput: QueryListSecondTagInput,
  ) {
    return this.secondTagService.findAll(
      paginateInput,
      queryListSecondTagInput,
    );
  }

  @Query(() => [SecondTag], { name: 'secondTagsByFirstTag' })
  @Public()
  findManyByFirstTag(
    @Args('id', { type: () => Int })
    id: number,
  ) {
    return this.secondTagService.findManyByFirstTagId(id);
  }

  @Query(() => SecondTag, { name: 'secondTag' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.secondTagService.findOne(id);
  }

  @Mutation(() => SecondTag)
  @Public()
  updateSecondTag(
    @Args('updateSecondTagInput') updateSecondTagInput: UpdateSecondTagInput,
  ) {
    return this.secondTagService.update(
      updateSecondTagInput.id,
      updateSecondTagInput,
    );
  }

  @Mutation(() => SecondTag)
  @Public()
  removeSecondTag(@Args('id', { type: () => Int }) id: number) {
    return this.secondTagService.remove(id);
  }
}
