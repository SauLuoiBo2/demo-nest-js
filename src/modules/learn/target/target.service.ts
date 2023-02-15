import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTargetInput } from './dto/create-target.input';
import { UpdateTargetInput } from './dto/update-target.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
import { QueryListTargetInput } from './dto/query-list-target.input';
import { filterByBasicFunc } from 'src/utils/filter';

const firstTagOnTargetInt = {
  select: {
    firstTag: { include: { secondTags: true } },
    firstTagId: true,
  },
};

@Injectable()
export class TargetService {
  constructor(private prisma: PrismaService, private slug: SlugService) {}

  private async findSlugs(slug: string) {
    return await this.prisma.target.findMany({
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

  private async _findByName(name: string) {
    return await this.prisma.target.findUnique({
      where: {
        name,
      },
    });
  }

  async create(createTargetInput: CreateTargetInput) {
    const check = await this._findByName(createTargetInput.name);
    if (check) {
      throw new ForbiddenException(
        'Target name or id created, please choose other',
      );
    }

    const slug = await this.uniqueSlug(createTargetInput.name);
    const data = {
      ...createTargetInput,
      slug,
    };
    return this.prisma.target.create({
      data,
    });
  }

  async findAll(queryListTargetInput: QueryListTargetInput) {
    const basicWhere = filterByBasicFunc(
      queryListTargetInput.name,
      queryListTargetInput.startDate,
      queryListTargetInput.endDate,
    );

    const result = await this.prisma.target.findMany({
      where: {
        AND: [...basicWhere],
      },
      orderBy: { order: 'asc' },
      include: {
        _count: true,
      },
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.target.findUnique({
      where: { id },
      include: {
        firstTags: firstTagOnTargetInt,
      },
    });

    if (!result) {
      throw new NotFoundException('target have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(id: number, updateTargetInput: UpdateTargetInput) {
    await this.findOne(id);

    const result = await this.prisma.target.update({
      where: { id },
      data: updateTargetInput,
      include: {
        firstTags: firstTagOnTargetInt,
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.prisma.target.delete({
      where: { id },
    });
    return result;
  }
}
