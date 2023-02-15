import { Module } from '@nestjs/common';
import { DocummentService } from './documment.service';
import { DocummentResolver } from './documment.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';

@Module({
  providers: [DocummentResolver, DocummentService],
  imports: [PrismaModule],
})
export class DocummentModule {}
