import { AddQuestionOnExerciseInput } from './dto/add-question-on-exercise.input';
import { Exercise } from './entities/exercise.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { PaginateInput } from '@common/meta-list';
import { createPaginator } from 'prisma-pagination';
import { QueryListExerciseInput } from './dto/query-list-exercise.input';
import { filterByBasicFunc } from 'src/utils/filter';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  // code
  private async findCodes(code: string) {
    return await this.prisma.exercise.findMany({
      where: {
        code,
      },
    });
  }

  // unique code
  private async uniqueCode(code: string): Promise<string> {
    const exists = await this.findCodes(code);
    if (!exists || exists.length === 0) {
      return code;
    }
    // Add to suffix
    throw new ForbiddenException('code da ton tai');
  }

  async create(
    createExerciseInput: CreateExerciseInput,
    addQuestionOnExerciseInput: AddQuestionOnExerciseInput[],
  ) {
    const code = await this.uniqueCode(createExerciseInput.code);
    const questions = [];

    addQuestionOnExerciseInput?.forEach((item) => {
      questions.push({ question: { connect: { id: item.questionId } } });
    });

    const data = {
      ...createExerciseInput,
      code,
      chapters: { create: questions },
    };
    const result = await this.prisma.exercise.create({
      data,
      include: {
        teacher: true,
      },
    });

    return result;
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListExerciseInput: QueryListExerciseInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;

    const basicWhere = filterByBasicFunc(
      queryListExerciseInput.name,
      queryListExerciseInput.startDate,
      queryListExerciseInput.endDate,
    );

    const result = await paginate<Exercise, Prisma.ExerciseFindManyArgs>(
      this.prisma.exercise,
      {
        where: {
          AND: [...basicWhere],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          teacher: true,
          questions: { select: { question: true, questionId: true } },
          chapters: true,
          subject: true,
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        teacher: true,
        questions: { select: { question: true, questionId: true } },
        chapters: true,
      },
    });
    if (!result) {
      throw new NotFoundException('exercise have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async findOneByCode(code: string) {
    const result = await this.prisma.exercise.findUnique({
      where: { code },
      include: {
        teacher: true,
        questions: { select: { question: true, questionId: true } },
        chapters: true,
      },
    });

    if (!result) {
      throw new NotFoundException('exercise have id ' + code + ' not found');
    } else {
      return result;
    }
  }

  async update(id: number, updateExerciseInput: UpdateExerciseInput) {
    await this.findOne(id);
    const result = await this.prisma.exercise.update({
      where: { id },
      data: updateExerciseInput,
      include: {
        teacher: true,
        questions: true,
        chapters: true,
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.prisma.question.delete({
      where: { id },
    });
    return result;
  }
}
