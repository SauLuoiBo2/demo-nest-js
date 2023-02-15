import { SubjectHi } from './../../subject/entities/subject-hi.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { SubjectOnTeacher as SubjectOnTeacherP } from '@prisma/client';
import { TeacherHi } from './teacher-hi.entity';

@ObjectType()
export class SubjectOnTeacher implements SubjectOnTeacherP {
  @Field({ nullable: true })
  teacherId: number;
  @Field({ nullable: true })
  subjectId: number;
  @Field({ nullable: true })
  subject: SubjectHi;

  @Field({ nullable: true })
  teacher: TeacherHi;
}
