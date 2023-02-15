import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChapterService } from './chapter.service';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterInput } from './dto/create-chapter.input';
import { UpdateChapterInput } from './dto/update-chapter.input';
import { Public } from '@modules/auth/role/public.decorator';
import { PaginateInput } from '@common/meta-list';
import { QueryListChapterInput } from './dto/query-list-chapter.input';
import { ListChapterResponse } from './dto/list-chapter.response';
import { BasicListIdInput } from '@common/input/basic-list-id.input';

@Resolver(() => Chapter)
export class ChapterResolver {
  constructor(private readonly chapterService: ChapterService) {}

  @Mutation(() => Chapter)
  @Public()
  createChapter(
    @Args({ name: 'createChapterInput', type: () => CreateChapterInput })
    createChapterInput: CreateChapterInput,
    @Args({
      name: 'addDocummentOnChapterInput',
      type: () => [BasicListIdInput],
      nullable: true,
      defaultValue: [],
    })
    addDocummentOnChapterInput: BasicListIdInput[],
  ) {
    return this.chapterService.create(
      createChapterInput,
      addDocummentOnChapterInput,
    );
  }

  @Query(() => ListChapterResponse, { name: 'chapters' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListChapterInput')
    queryListChapterInput: QueryListChapterInput,
  ) {
    return this.chapterService.findAll(paginateInput, queryListChapterInput);
  }

  @Query(() => Chapter, { name: 'chapter' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chapterService.findOne(id);
  }

  @Mutation(() => Chapter)
  @Public()
  updateChapter(
    @Args('updateChapterInput') updateChapterInput: UpdateChapterInput,
    @Args({
      name: 'listDocummentInput',
      type: () => [BasicListIdInput],
      nullable: true,
    })
    listDocummentInput: BasicListIdInput[],
    @Args({
      name: 'listExerciseInput',
      type: () => [BasicListIdInput],
      nullable: true,
    })
    listExerciseInput: BasicListIdInput[],
  ) {
    return this.chapterService.update(
      updateChapterInput.id,
      updateChapterInput,
      listDocummentInput,
      listExerciseInput,
    );
  }

  @Mutation(() => Chapter)
  @Public()
  removeChapter(@Args('id', { type: () => Int }) id: number) {
    return this.chapterService.remove(id);
  }
}
