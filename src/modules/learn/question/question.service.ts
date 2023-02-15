import { Question } from './entities/question.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { PaginateInput } from '@common/meta-list';
import { QueryListQuestionInput } from './dto/query-list-question.input';
import { createPaginator } from 'prisma-pagination';
import { filterByBasicFunc } from 'src/utils/filter';
import { Prisma } from '@prisma/client';
import { filterById, filterByListId } from '@common/filter';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { makeIdCreateList } from 'src/utils/prisma';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  // code
  private async findCodes(code: string) {
    return await this.prisma.question.findMany({
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
  // slug

  async create(
    createQuestionInput: CreateQuestionInput,
    addThirdTagOnQuestion: BasicListIdInput[],
  ) {
    const code = await this.uniqueCode(createQuestionInput.code);
    // const thirdTags = [];
    // addThirdTagOnQuestion?.forEach((item) => {
    //   thirdTags.push({ thirdTag: { connect: { id: item.id } } });
    // });

    const thirdTags = makeIdCreateList('thirdTag', addThirdTagOnQuestion);

    const data = {
      ...createQuestionInput,
      code,
      thirdTags: { create: thirdTags },
    };

    const result = await this.prisma.question.create({
      data,
      include: {
        teacher: true,
        exercises: { include: { exercise: true } },
        thirdTags: { include: { thirdTag: true } },
        subject: true,
      },
    });

    return result;
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListQuestionInput: QueryListQuestionInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;

    const basicWhere = filterByBasicFunc(
      queryListQuestionInput.name,
      queryListQuestionInput.startDate,
      queryListQuestionInput.endDate,
    );

    const thirdTags = filterByListId(
      'thirdTag',
      queryListQuestionInput.thirdTags,
    );

    const exercise = filterById(queryListQuestionInput.exerciseId);

    const result = await paginate<Question, Prisma.QuestionFindManyArgs>(
      this.prisma.question,
      {
        where: {
          AND: [
            ...basicWhere,
            { thirdTags },
            // { exercises: { some: { exercise } } },
          ],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          teacher: true,
          exercises: { include: { exercise: true } },
          thirdTags: { include: { thirdTag: true } },
          subject: true,
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.question.findUnique({
      where: { id },
      include: {
        teacher: true,
        exercises: { include: { exercise: true } },
        thirdTags: { include: { thirdTag: true } },
        subject: true,
      },
    });

    if (!result) {
      throw new NotFoundException('chapter have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async findOneByCode(code: string) {
    const result = await this.prisma.question.findUnique({
      where: { code },
      include: {
        teacher: true,
        exercises: { include: { exercise: true } },
        thirdTags: { include: { thirdTag: true } },
        subject: true,
      },
    });

    if (!result) {
      throw new NotFoundException('question have id ' + code + ' not found');
    } else {
      return result;
    }
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    await this.findOne(id);
    const result = await this.prisma.question.update({
      where: { id },
      data: updateQuestionInput,
      include: {
        teacher: true,
        exercises: { include: { exercise: true } },
        thirdTags: { include: { thirdTag: true } },
        subject: true,
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
