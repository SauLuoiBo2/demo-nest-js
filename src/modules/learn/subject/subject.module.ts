import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';

@Module({
  providers: [SubjectResolver, SubjectService],
  imports: [PrismaModule, SlugModule],
  exports: [SubjectService],
})
export class SubjectModule {}
