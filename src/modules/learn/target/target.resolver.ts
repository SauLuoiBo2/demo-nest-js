import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TargetService } from './target.service';
import { Target } from './entities/target.entity';
import { CreateTargetInput } from './dto/create-target.input';
import { UpdateTargetInput } from './dto/update-target.input';
import { Public } from 'src/modules/auth/role/public.decorator';
import { QueryListTargetInput } from './dto/query-list-target.input';

@Resolver(() => Target)
export class TargetResolver {
  constructor(private readonly targetService: TargetService) {}

  @Mutation(() => Target)
  @Public()
  createTarget(
    @Args({
      name: 'createTargetInput',
      type: () => CreateTargetInput,
    })
    createTargetInput: CreateTargetInput,
  ) {
    return this.targetService.create(createTargetInput);
  }

  @Query(() => [Target], { name: 'targets' })
  @Public()
  findAll(
    @Args('queryListTargetInput')
    queryListTargetInput: QueryListTargetInput,
  ) {
    return this.targetService.findAll(queryListTargetInput);
  }

  @Query(() => Target, { name: 'target' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.targetService.findOne(id);
  }

  @Mutation(() => Target)
  @Public()
  updateTarget(
    @Args('updateTargetInput') updateTargetInput: UpdateTargetInput,
  ) {
    return this.targetService.update(updateTargetInput.id, updateTargetInput);
  }

  @Mutation(() => Target)
  @Public()
  removeTarget(@Args('id', { type: () => Int }) id: number) {
    return this.targetService.remove(id);
  }
}
