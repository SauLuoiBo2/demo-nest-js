import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseResolver } from './exercise.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';

@Module({
  providers: [ExerciseResolver, ExerciseService],
  imports: [PrismaModule],
})
export class ExerciseModule {}
