import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocummentService } from './documment.service';
import { Documment } from './entities/documment.entity';
import { CreateDocummentInput } from './dto/create-documment.input';
import { UpdateDocummentInput } from './dto/update-documment.input';
import { PaginateInput } from '@common/meta-list';
import { QueryListDocummentInput } from './dto/query-list-documment.input';
import { ListDocummentResponse } from './dto/list-documment.response';
import { Public } from 'src/modules/auth/role/public.decorator';

@Resolver(() => Documment)
export class DocummentResolver {
  constructor(private readonly docummentService: DocummentService) {}

  @Mutation(() => Documment)
  @Public()
  createDocumment(
    @Args('createDocummentInput') createDocummentInput: CreateDocummentInput,
  ) {
    return this.docummentService.create(createDocummentInput);
  }

  @Query(() => ListDocummentResponse, { name: 'documments' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListDocummentInput')
    queryListDocummentInput: QueryListDocummentInput,
  ) {
    return this.docummentService.findAll(
      paginateInput,
      queryListDocummentInput,
    );
  }

  @Query(() => Documment, { name: 'documment' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.docummentService.findOne(id);
  }

  @Mutation(() => Documment)
  @Public()
  updateDocumment(
    @Args('updateDocummentInput') updateDocummentInput: UpdateDocummentInput,
  ) {
    return this.docummentService.update(
      updateDocummentInput.id,
      updateDocummentInput,
    );
  }

  @Mutation(() => Documment)
  @Public()
  removeDocumment(@Args('id', { type: () => Int }) id: number) {
    return this.docummentService.remove(id);
  }
}
