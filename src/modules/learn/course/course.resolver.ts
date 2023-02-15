import { PaginateInput } from '@common/meta-list';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Public } from '@modules/auth/role/public.decorator';
import { ListCourseResponse } from './dto/list-course.response';
import { QueryListCourseInput } from './dto/query-list-course.input';
import { BasicListIdInput } from '@common/input/basic-list-id.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  @Public()
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
    @Args({
      name: 'listFirstTagInput',
      type: () => [BasicListIdInput],
      nullable: true,
      defaultValue: [],
    })
    listFirstTags: BasicListIdInput[],
  ) {
    return this.courseService.create(createCourseInput, listFirstTags);
  }

  @Query(() => ListCourseResponse, { name: 'courses' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListCourseInput')
    queryListCourseInput: QueryListCourseInput,
  ) {
    return this.courseService.findAll(paginateInput, queryListCourseInput);
  }

  @Query(() => Course, { name: 'course' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.findOne(id);
  }

  @Mutation(() => Course)
  @Public()
  updateCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
    @Args({
      name: 'listFirstTagInput',
      type: () => [BasicListIdInput],
      nullable: true,
    })
    listFirstTags: BasicListIdInput[],
  ) {
    return this.courseService.update(
      updateCourseInput.id,
      updateCourseInput,
      listFirstTags,
    );
  }

  @Mutation(() => Course)
  @Public()
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.remove(id);
  }
}
