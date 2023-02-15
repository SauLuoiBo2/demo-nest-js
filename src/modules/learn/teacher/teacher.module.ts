import { FileModule } from '@configs/file/file.module';
import { SlugModule } from './../../../configs/slug/slug.module';
import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';

@Module({
  providers: [TeacherResolver, TeacherService],
  imports: [PrismaModule, SlugModule, FileModule],
  exports: [TeacherService],
})
export class TeacherModule {}
