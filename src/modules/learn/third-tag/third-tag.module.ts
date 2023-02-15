import { Module } from '@nestjs/common';
import { ThirdTagService } from './third-tag.service';
import { ThirdTagResolver } from './third-tag.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';

@Module({
  providers: [ThirdTagResolver, ThirdTagService],
  imports: [PrismaModule, SlugModule],
})
export class ThirdTagModule {}
