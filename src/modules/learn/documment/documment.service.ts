import { Documment } from './entities/documment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocummentInput } from './dto/create-documment.input';
import { UpdateDocummentInput } from './dto/update-documment.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { PaginateInput } from '@common/meta-list';
import { QueryListDocummentInput } from './dto/query-list-documment.input';
import { createPaginator } from 'prisma-pagination';
import { filterByBasicFunc } from 'src/utils/filter';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocummentService {
  constructor(private prisma: PrismaService) {}

  create(createDocummentInput: CreateDocummentInput) {
    const data = {
      ...createDocummentInput,
    };
    const result = this.prisma.documment.create({
      data,
      include: {
        chapters: true,
      },
    });
    return result;
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListDocummentInput: QueryListDocummentInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;

    const basicWhere = filterByBasicFunc(
      queryListDocummentInput.name,
      queryListDocummentInput.startDate,
      queryListDocummentInput.endDate,
    );

    const result = await paginate<Documment, Prisma.DocummentFindManyArgs>(
      this.prisma.documment,
      {
        where: {
          AND: [...basicWhere],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          chapters: { select: { chapter: true, chapterId: true } },
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.documment.findUnique({
      where: { id },
      include: {
        chapters: { select: { chapter: true, chapterId: true } },
      },
    });
    if (!result) {
      throw new NotFoundException('documment have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(id: number, updateDocummentInput: UpdateDocummentInput) {
    await this.findOne(id);

    const result = await this.prisma.documment.update({
      where: { id },
      data: updateDocummentInput,
      include: {
        chapters: true,
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.prisma.documment.delete({
      where: { id },
    });
    return result;
  }
}
