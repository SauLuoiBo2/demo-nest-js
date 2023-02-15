import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterResolver } from './chapter.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';

@Module({
  providers: [ChapterResolver, ChapterService],
  imports: [PrismaModule, SlugModule],
})
export class ChapterModule {}
