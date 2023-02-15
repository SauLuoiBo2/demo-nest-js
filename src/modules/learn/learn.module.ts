import { Module } from '@nestjs/common';

import { PrismaModule } from '@prismaApp/prisma.module';
import { SubjectModule } from './subject/subject.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { FirstTagModule } from './first-tag/first-tag.module';
import { QuestionModule } from './question/question.module';
import { SecondTagModule } from './second-tag/second-tag.module';
import { TargetModule } from './target/target.module';
import { DocummentModule } from './documment/documment.module';
import { ChapterModule } from './chapter/chapter.module';
import { ThirdTagModule } from './third-tag/third-tag.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  providers: [],
  imports: [
    PrismaModule,
    SubjectModule,
    TeacherModule,
    CourseModule,
    FirstTagModule,
    QuestionModule,
    SecondTagModule,
    TargetModule,
    DocummentModule,
    ChapterModule,
    ThirdTagModule,
    ExerciseModule,
  ],
})
export class LearnModule {}
