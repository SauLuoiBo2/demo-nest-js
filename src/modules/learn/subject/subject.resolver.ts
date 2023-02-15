import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { Public } from 'src/modules/auth/role/public.decorator';
@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(() => Subject)
  @Public()
  createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ) {
    return this.subjectService.create(createSubjectInput);
  }

  @Query(() => [Subject], { name: 'subjects' })
  @Public()
  findAll() {
    return this.subjectService.findAll();
  }

  @Query(() => Subject, { name: 'subject' })
  @Public()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.findOne(id);
  }

  @Mutation(() => Subject)
  @Public()
  updateSubject(
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ) {
    return this.subjectService.update(
      updateSubjectInput.id,
      updateSubjectInput,
    );
  }

  @Mutation(() => Subject)
  @Public()
  removeSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.remove(id);
  }
}
