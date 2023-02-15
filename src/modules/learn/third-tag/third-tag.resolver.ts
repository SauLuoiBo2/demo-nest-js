import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThirdTagService } from './third-tag.service';
import { ThirdTag } from './entities/third-tag.entity';
import { CreateThirdTagInput } from './dto/create-third-tag.input';
import { UpdateThirdTagInput } from './dto/update-third-tag.input';
import { Public } from '@modules/auth/role/public.decorator';
import { ListThirdTagResponse } from './dto/list-third-tag.response';
import { PaginateInput } from '@common/meta-list';
import { QueryListThirdTagInput } from './dto/query-third-tag.input';

@Resolver(() => ThirdTag)
export class ThirdTagResolver {
  constructor(private readonly thirdTagService: ThirdTagService) {}

  @Mutation(() => ThirdTag)
  @Public()
  createThirdTag(
    @Args('createThirdTagInput') createThirdTagInput: CreateThirdTagInput,
  ) {
    return this.thirdTagService.create(createThirdTagInput);
  }

  @Query(() => ListThirdTagResponse, { name: 'thirdTags' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListThirdTagInput')
    queryListThirdTagInput: QueryListThirdTagInput,
  ) {
    return this.thirdTagService.findAll(paginateInput, queryListThirdTagInput);
  }

  @Query(() => ThirdTag, { name: 'thirdTag' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.thirdTagService.findOne(id);
  }

  @Mutation(() => ThirdTag)
  @Public()
  updateThirdTag(
    @Args('updateThirdTagInput') updateThirdTagInput: UpdateThirdTagInput,
  ) {
    return this.thirdTagService.update(
      updateThirdTagInput.id,
      updateThirdTagInput,
    );
  }

  @Mutation(() => ThirdTag)
  @Public()
  removeThirdTag(@Args('id', { type: () => Int }) id: number) {
    return this.thirdTagService.remove(id);
  }
}
