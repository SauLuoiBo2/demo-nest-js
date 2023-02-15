import { Course } from './entities/course.entity';
import { PaginateInput } from '@common/meta-list';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { QueryListCourseInput } from './dto/query-list-course.input';
import { filterByBasicFunc } from 'src/utils/filter';
import { BasicListIdInput } from '@common/input/basic-list-id.input';
import { makeIdCreateList, makeIdUpdateList } from 'src/utils/prisma';
import {
  filterByListId,
  filterByListOneId,
} from '@common/filter/filter-by-list-id.input';
import { FileService } from '@configs/file/file.service';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private slug: SlugService,
    private fileService: FileService,
  ) {}

  private _courseImgFolder = 'course';

  // slug
  private async findSlugs(slug: string) {
    return await this.prisma.course.findMany({
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
    createCourseInput: CreateCourseInput,
    listFirstTags?: BasicListIdInput[],
  ) {
    const firstTags = makeIdCreateList('firstTag', listFirstTags);
    const slug = await this.uniqueSlug(createCourseInput.name);

    const { thumb, ...dataCreate } = createCourseInput;
    const thumbAdd = await this.fileService.getCreateNameFile(
      thumb,
      'thumb',
      this._courseImgFolder,
    );
    const data = {
      ...dataCreate,
      ...thumbAdd,
      slug,
      firstTags: { create: firstTags },
    };
    return this.prisma.course.create({
      data,
      include: {
        chapters: true,
        firstTags: { select: { firstTag: true, firstTagId: true } },
        teacher: true,
      },
    });
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListCourseInput: QueryListCourseInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    const orderCreatedAt = paginateInput.createAt;

    const firstTags = filterByListId(
      'firstTag',
      queryListCourseInput.firstTags,
    );
    const teacher = filterByListOneId(queryListCourseInput.teachers);

    const basicWhere = filterByBasicFunc(
      queryListCourseInput.name,
      queryListCourseInput.startDate,
      queryListCourseInput.endDate,
    );

    const result = await paginate<Course, Prisma.CourseFindManyArgs>(
      this.prisma.course,
      {
        where: {
          AND: [...basicWhere, { firstTags }, { teacher }],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          teacher: true,
          firstTags: { select: { firstTag: true, firstTagId: true } },
          chapters: true,
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        firstTags: { select: { firstTag: true, firstTagId: true } },
        chapters: {
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!result) {
      throw new NotFoundException('course have id ' + id + ' not found');
    } else {
      return result;
    }
  }

  async update(
    id: number,
    updateCourseInput: UpdateCourseInput,
    listFirstTags?: BasicListIdInput[],
  ) {
    const course = await this.findOne(id);

    const { thumb: thumbName } = course;

    const firstTags = makeIdUpdateList('firstTag', listFirstTags);

    const { thumb: thumbFile, ...dataUpdate } = updateCourseInput;

    const thumbAdd = await this.fileService.getUpdateNameFile(
      thumbFile,
      thumbName,
      'thumb',
      this._courseImgFolder,
    );

    const result = await this.prisma.course.update({
      where: { id },
      data: { ...dataUpdate, ...thumbAdd, firstTags },
      include: {
        teacher: true,
        firstTags: { select: { firstTag: true, firstTagId: true } },
        chapters: true,
      },
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);

    const result = await this.prisma.course.delete({
      where: { id },
    });
    return result;
  }
}
