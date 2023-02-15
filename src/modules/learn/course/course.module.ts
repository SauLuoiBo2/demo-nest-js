import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';
import { FileModule } from '@configs/file/file.module';
@Module({
  providers: [CourseResolver, CourseService],
  imports: [PrismaModule, SlugModule, FileModule],
})
export class CourseModule {}
