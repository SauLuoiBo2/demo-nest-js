import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetResolver } from './target.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';
@Module({
  providers: [TargetResolver, TargetService],
  imports: [PrismaModule, SlugModule],
})
export class TargetModule {}
