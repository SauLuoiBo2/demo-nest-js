import { FirstTag } from '@modules/learn/first-tag/entities/first-tag.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFirstTagInput } from './dto/create-first-tag.input';
import { UpdateFirstTagInput } from './dto/update-first-tag.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
import { QueryListFirstTagInput } from './dto/query-list-first-tag.input';
import { filterByBasicFunc } from 'src/utils/filter';
import { PaginateInput } from '@common/meta-list';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { makeIdCreateList, makeIdUpdateList } from 'src/utils/prisma';
import { filterById, filterByListId } from '@common/filter';

const firstTagOnTargetInt = {
  select: { target: true, targetId: true },
};

@Injectable()
export class FirstTagService {
  constructor(private prisma: PrismaService, private slug: SlugService) {}

  private async findSlugs(slug: string) {
    return await this.prisma.firstTag.findMany({
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

  async create(
    createFirstTagInput: CreateFirstTagInput,
    addTargetOnFirstTagInput: BasicListIdInput[],
  ) {
    const slug = await this.uniqueSlug(createFirstTagInput.name);

    const targets = makeIdCreateList('target', addTargetOnFirstTagInput);
    const data = {
      ...createFirstTagInput,
      slug,
      targets: { create: targets },
    };
    return this.prisma.firstTag.create({
      data,
      include: {
        targets: { include: { target: true } },
        subject: true,
      },
    });
  }

  async findManyBySubjectId(id: number) {
    const type = typeof id;

    if (type !== 'number') {
      return [];
    } else {
      return this.prisma.firstTag.findMany({
        where: {
          subjectId: id,
        },
        include: {
          targets: firstTagOnTargetInt,
          subject: true,
        },
      });
    }
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListFirstTagInput: QueryListFirstTagInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });

    const basicWhere = filterByBasicFunc(
      queryListFirstTagInput.name,
      queryListFirstTagInput.startDate,
      queryListFirstTagInput.endDate,
    );

    const subject = filterById(queryListFirstTagInput.subjectId);

    const targets = filterByListId('target', queryListFirstTagInput.targets);

    const result = await paginate<FirstTag, Prisma.FirstTagFindManyArgs>(
      this.prisma.firstTag,
      {
        where: {
          AND: [...basicWhere, { subject }, { targets }],
        },
        orderBy: { id: 'asc' },
        include: {
          targets: { include: { target: true } },
          subject: true,
          secondTags: {
            include: { thirdTags: true },
          },
          _count: true,
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.firstTag.findUnique({
      where: { id },
      include: {
        targets: firstTagOnTargetInt,
        subject: true,
        secondTags: {
          include: {
            thirdTags: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        courses: {
          include: { course: true },
        },
        _count: true,
      },
    });

    if (!result) {
      throw new NotFoundException('firstTag have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(
    id: number,
    updateFirstTagInput: UpdateFirstTagInput,
    addTargetOnFirstTagInput?: BasicListIdInput[],
  ) {
    await this.findOne(id);

    const targets = makeIdUpdateList('target', addTargetOnFirstTagInput);

    const result = await this.prisma.firstTag.update({
      where: { id },
      data: { ...updateFirstTagInput, targets },
      include: {
        targets: firstTagOnTargetInt,
        subject: true,
        secondTags: {
          include: { thirdTags: true },
        },
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.prisma.firstTag.delete({
      where: { id },
    });
    return result;
  }

  // addTargetOnFirstTag(addTargetOnFirstTagDto: AddTargetOnFirstTagInput[]) {
  //   const data = addTargetOnFirstTagDto;
  //   return this.prisma.firstTagOnTarget.createMany({ data });
  // }
}
