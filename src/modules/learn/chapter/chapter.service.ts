import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChapterInput } from './dto/create-chapter.input';
import { UpdateChapterInput } from './dto/update-chapter.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
import { PaginateInput } from '@common/meta-list';
import { createPaginator } from 'prisma-pagination';
import { Chapter, Prisma } from '@prisma/client';
import { filterByBasicFunc } from 'src/utils/filter';
import { QueryListChapterInput } from './dto/query-list-chapter.input';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { makeIdCreateList, makeIdUpdateList } from 'src/utils/prisma';
import { filterById } from '@common/filter';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService, private slug: SlugService) {}

  // slug
  private async findSlugs(slug: string) {
    return await this.prisma.chapter.findMany({
      where: {
        slug: {
          equals: slug,
        },
      },
    });
  }
  async uniqueSlug(name: string): Promise<string> {
    const slug = this.slug.slugify(name);
    let exists = await this.findSlugs(slug);

    // if slug doesn't already exists
    if (!exists || exists.length === 0) {
      return slug;
    }

    // Add to suffix
    let uniqueSlug;
    while (exists.length !== 0) {
      uniqueSlug = this.slug.random(name);
      exists = await this.findSlugs(uniqueSlug);
    }

    return uniqueSlug;
  }
  // slug

  async create(
    createChapterInput: CreateChapterInput,
    addDocummentOnChapterInput: BasicListIdInput[],
  ) {
    const slug = await this.uniqueSlug(createChapterInput.name);

    const documments = makeIdCreateList(
      'documment',
      addDocummentOnChapterInput,
    );

    const data = {
      ...createChapterInput,
      slug,
      documments: { create: documments },
    };
    return this.prisma.chapter.create({
      data,
      include: { course: true },
    });
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListChapterInput: QueryListChapterInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;

    const basicWhere = filterByBasicFunc(
      queryListChapterInput.name,
      queryListChapterInput.startDate,
      queryListChapterInput.endDate,
    );

    const course = filterById(queryListChapterInput.courseId);
    const result = await paginate<Chapter, Prisma.ChapterFindFirstArgs>(
      this.prisma.chapter,
      {
        where: {
          AND: [...basicWhere, { course }],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          course: true,
          documments: { include: { documment: true } },
          exercises: { include: { exercise: true } },
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.chapter.findUnique({
      where: { id },
      include: {
        course: true,
        documments: { include: { documment: true } },
        exercises: { include: { exercise: true } },
      },
    });

    if (!result) {
      throw new NotFoundException('chapter have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(
    id: number,
    updateChapterInput: UpdateChapterInput,
    listDocumments: BasicListIdInput[],
    listExercises: BasicListIdInput[],
  ) {
    await this.findOne(id);
    const documments = makeIdUpdateList('documment', listDocumments);
    const exercises = makeIdUpdateList('exercise', listExercises);

    const result = await this.prisma.chapter.update({
      where: { id },
      data: { ...updateChapterInput, documments, exercises },
      include: {
        course: true,
        documments: { include: { documment: true } },
        exercises: { include: { exercise: true } },
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);

    const result = await this.prisma.chapter.delete({
      where: { id },
    });
    return result;
  }
}
