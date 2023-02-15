import { ThirdTag } from './entities/third-tag.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThirdTagInput } from './dto/create-third-tag.input';
import { UpdateThirdTagInput } from './dto/update-third-tag.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
import { PaginateInput } from '@common/meta-list';
import { QueryListThirdTagInput } from './dto/query-third-tag.input';
import { createPaginator } from 'prisma-pagination';
import { filterByBasicFunc } from 'src/utils/filter';
import { Prisma } from '@prisma/client';
import { filterById } from '@common/filter';

@Injectable()
export class ThirdTagService {
  constructor(private prisma: PrismaService, private slug: SlugService) {}

  private async findSlugs(slug: string) {
    return await this.prisma.thirdTag.findMany({
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

  async create(createThirdTagInput: CreateThirdTagInput) {
    const slug = await this.uniqueSlug(createThirdTagInput.name);
    const data = {
      ...createThirdTagInput,
      slug,
    };
    return this.prisma.thirdTag.create({
      data,
      include: {
        secondTag: true,
        questions: true,
      },
    });
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListThirdTagInput: QueryListThirdTagInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;

    const basicWhere = filterByBasicFunc(
      queryListThirdTagInput.name,
      queryListThirdTagInput.startDate,
      queryListThirdTagInput.endDate,
    );

    const secondTag = filterById(queryListThirdTagInput.secondTagId);

    const result = await paginate<ThirdTag, Prisma.ThirdTagFindManyArgs>(
      this.prisma.thirdTag,
      {
        where: {
          AND: [...basicWhere, { secondTag }],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          secondTag: { include: { firstTag: { include: { subject: true } } } },
          questions: true,
        },
      },
    );

    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.thirdTag.findUnique({
      where: { id },
      include: {
        secondTag: { include: { firstTag: { include: { subject: true } } } },
        questions: true,
      },
    });

    if (!result) {
      throw new NotFoundException('secondTag have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(id: number, updateThirdTagInput: UpdateThirdTagInput) {
    await this.findOne(id);

    const result = await this.prisma.thirdTag.update({
      where: { id },
      data: updateThirdTagInput,
      include: {
        secondTag: true,
        questions: true,
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.prisma.thirdTag.delete({
      where: { id },
    });
    return result;
  }
}
