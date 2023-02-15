import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSecondTagInput } from './dto/create-second-tag.input';
import { UpdateSecondTagInput } from './dto/update-second-tag.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
import { PaginateInput } from '@common/meta-list';
import { QueryListSecondTagInput } from './dto/query-list-second-tag.input';
import { createPaginator } from 'prisma-pagination';
import { filterByBasicFunc } from 'src/utils/filter';
import { SecondTag } from './entities/second-tag.entity';
import { Prisma } from '@prisma/client';
import { filterById } from '@common/filter';

@Injectable()
export class SecondTagService {
  constructor(private prisma: PrismaService, private slug: SlugService) {}
  // slug
  private async findSlugs(slug: string) {
    return await this.prisma.secondTag.findMany({
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

  async create(createSecondTagInput: CreateSecondTagInput) {
    const slug = await this.uniqueSlug(createSecondTagInput.name);
    const data = {
      ...createSecondTagInput,
      slug,
    };
    return this.prisma.secondTag.create({
      data,
      include: {
        firstTag: true,
      },
    });
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListSecondTagInput: QueryListSecondTagInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;
    const basicWhere = filterByBasicFunc(
      queryListSecondTagInput.name,
      queryListSecondTagInput.startDate,
      queryListSecondTagInput.endDate,
    );

    const firstTag = filterById(queryListSecondTagInput.firstTagId);

    const result = await paginate<SecondTag, Prisma.SecondTagFindManyArgs>(
      this.prisma.secondTag,
      {
        where: {
          AND: [...basicWhere, { firstTag }],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          firstTag: { include: { subject: true } },
          thirdTags: true,
          _count: true,
        },
      },
    );
    return result;
  }

  async findManyByFirstTagId(id: number) {
    const type = typeof id;

    if (type !== 'number') {
      return [];
    } else {
      return this.prisma.secondTag.findMany({
        where: {
          firstTagId: id,
        },
        include: {
          firstTag: { include: { subject: true } },
          thirdTags: true,
        },
      });
    }
  }

  async findOne(id: number) {
    const result = await this.prisma.secondTag.findUnique({
      where: { id },
      include: {
        firstTag: { include: { subject: true } },
        thirdTags: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('secondTag have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(id: number, updateSecondTagInput: UpdateSecondTagInput) {
    await this.findOne(id);

    const result = await this.prisma.secondTag.update({
      where: { id },
      data: updateSecondTagInput,
      include: {
        firstTag: { include: { subject: true } },
        thirdTags: true,
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.prisma.secondTag.delete({
      where: { id },
    });
    return result;
  }
}
