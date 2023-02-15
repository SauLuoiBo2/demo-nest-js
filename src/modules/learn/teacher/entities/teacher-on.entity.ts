import { ObjectType, Field } from '@nestjs/graphql';
import { TeacherHi } from './teacher-hi.entity';

@ObjectType()
export class TeacherOn {
  @Field({ nullable: true })
  teacherId: number;

  @Field({ nullable: true })
  teacher: TeacherHi;
}
