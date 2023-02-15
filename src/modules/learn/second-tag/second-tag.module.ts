import { Module } from '@nestjs/common';
import { SecondTagService } from './second-tag.service';
import { SecondTagResolver } from './second-tag.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { SlugModule } from '@configs/slug/slug.module';

@Module({
  providers: [SecondTagResolver, SecondTagService],
  imports: [PrismaModule, SlugModule],
})
export class SecondTagModule {}
