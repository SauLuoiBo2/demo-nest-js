import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { Public } from 'src/modules/auth/role/public.decorator';
import { SubjectListCreateInput } from './dto/quick-create-teacher.input';
import { PaginateInput } from '@common/meta-list';
import { ListTeacherResponse } from './dto/list-teacher.response';
import { QueryListTeacherInput } from './dto/query-list-teacher.input';
import { FileUpload } from 'graphql-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  @Public()
  createTeacher(
    @Args({
      name: 'createTeacherInput',
      type: () => CreateTeacherInput,
    })
    createTeacherInput: CreateTeacherInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    return this.teacherService.create(createTeacherInput, file);
  }

  @Mutation(() => Teacher)
  @Public()
  createQuickTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
    @Args({
      name: 'subjectListCreateInput',
      type: () => [SubjectListCreateInput],
      nullable: true,
      defaultValue: [],
    })
    subjectListCreateInput: SubjectListCreateInput[],
  ) {
    return this.teacherService.quickCreate(
      createTeacherInput,
      subjectListCreateInput,
    );
  }

  @Query(() => ListTeacherResponse, { name: 'teachers' })
  @Public()
  findAll(
    @Args('paginateInput')
    paginateInput: PaginateInput,
    @Args('queryListTeacherInput', { nullable: true })
    queryListTeacherInput?: QueryListTeacherInput,
  ) {
    return this.teacherService.findAll(paginateInput, queryListTeacherInput);
  }

  @Query(() => Teacher, { name: 'teacher' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => Teacher)
  @Public()
  updateTeacher(
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
    @Args({
      name: 'subjectListCreateInput',
      type: () => [SubjectListCreateInput],
      nullable: true,
    })
    subjectListCreateInput: SubjectListCreateInput[],
  ) {
    return this.teacherService.update(
      updateTeacherInput.id,
      updateTeacherInput,
      subjectListCreateInput,
    );
  }

  @Mutation(() => Teacher)
  @Public()
  removeTeacher(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.remove(id);
  }
}
