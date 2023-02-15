import { Module } from '@nestjs/common';
import { FirstTagService } from './first-tag.service';
import { FirstTagResolver } from './first-tag.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';

@Module({
  providers: [FirstTagResolver, FirstTagService],
  imports: [PrismaModule, SlugModule],
})
export class FirstTagModule {}
