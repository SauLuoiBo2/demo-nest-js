import { FileUpload } from 'graphql-upload';
import { FileService } from './../../../configs/file/file.service';
import { SlugService } from './../../../configs/slug/slug.service';
import { Teacher } from './entities/teacher.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SubjectListCreateInput } from './dto/quick-create-teacher.input';
import { PaginateInput } from '@common/meta-list';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { QueryListTeacherInput } from './dto/query-list-teacher.input';
import { filterDateFunc } from 'src/utils/filter/filter-date.func';
import { filterByContainsFunc } from 'src/utils/filter/filter-by-contains.func';
import { filterListTeacherBySubjectId } from './func';

@Injectable()
export class TeacherService {
  constructor(
    private prisma: PrismaService,
    private slug: SlugService,
    private fileService: FileService,
  ) {}

  private async findSlugs(slug: string) {
    return await this.prisma.teacher.findMany({
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

  async create(createTeacherInput: CreateTeacherInput, file: FileUpload) {
    const slug = await this.uniqueSlug(createTeacherInput.name);
    const avatar = await this.fileService.uploadImage(file, 'teacher');
    const data = {
      ...createTeacherInput,
      avatar,
      slug,
    };
    return this.prisma.teacher.create({
      data,
    });
  }

  _makeSubjectList(subjectList?: SubjectListCreateInput[]) {
    const subjects = [];
    subjectList?.forEach((item) => {
      subjects.push({ subject: { connect: { id: item.id } } });
    });

    return subjects;
  }

  async quickCreate(
    createTeacherInput: CreateTeacherInput,
    subjectList: SubjectListCreateInput[],
  ) {
    const subjects = this._makeSubjectList(subjectList);

    const { avatar, ...dataCreate } = createTeacherInput;

    const slug = await this.uniqueSlug(createTeacherInput.name);

    const avatarAdd = await this.fileService.getCreateNameFile(
      avatar,
      'avatar',
      'teacher',
    );

    // data
    const data = {
      ...dataCreate,
      ...avatarAdd,
      slug,
      subjects: {
        create: subjects,
      },
    };

    return this.prisma.teacher.create({
      data,
      include: { subjects: { select: { subject: true } } },
    });
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListTeacherInput?: QueryListTeacherInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });
    // order by create at
    const orderCreatedAt = paginateInput.createAt;
    // filter by name

    const name = filterByContainsFunc(queryListTeacherInput.name);

    // filter by subjects Id

    const subjects = filterListTeacherBySubjectId(
      queryListTeacherInput.subjectId,
    );

    // filter by date create at

    const filterDateFunProps = {
      startDate: queryListTeacherInput.startDate,
      endDate: queryListTeacherInput.endDate,
    };

    const createdAt = filterDateFunc(filterDateFunProps);

    // results

    const result = await paginate<Teacher, Prisma.TeacherFindManyArgs>(
      this.prisma.teacher,
      {
        where: {
          AND: [
            { name },

            // { subjectOnTeacher: { some: { subject } } },
            { createdAt },
            { subjects },
          ],
        },
        orderBy: {
          createdAt: orderCreatedAt || 'asc',
        },
        include: {
          subjects: {
            select: { subject: true },
            orderBy: { subject: { id: 'asc' } },
          },
          _count: true,
        },
      },
    );

    return result;
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        subjects: { include: { subject: true } },
        _count: true,
      },
    });
    if (!teacher) {
      throw new NotFoundException('subject have id ' + id + ' not found');
    } else {
      return teacher;
    }
  }

  _updateListSubject(subjectList?: SubjectListCreateInput[]) {
    if (!subjectList) {
      return {};
    } else {
      const subjects = this._makeSubjectList(subjectList);
      return { deleteMany: {}, create: subjects };
    }
  }

  async update(
    id: number,
    updateTeacherInput: UpdateTeacherInput,
    subjectList?: SubjectListCreateInput[],
  ) {
    const teacher = await this.findOne(id);

    const { avatar: avatarName } = teacher;

    const { avatar: avatarFile, ...dataUpdate } = updateTeacherInput;

    const avatarAdd = await this.fileService.getUpdateNameFile(
      avatarFile,
      avatarName,
      'avatar',
      'teacher',
    );

    const subjects = this._updateListSubject(subjectList);
    const updatedSubject = await this.prisma.teacher.update({
      where: { id },
      data: {
        ...dataUpdate,
        ...avatarAdd,
        subjects,
      },
      include: { subjects: { select: { subject: true } } },
    });
    return updatedSubject;
  }

  async remove(id: number) {
    await this.findOne(id);
    const deletedSubject = await this.prisma.teacher.delete({
      where: { id },
    });
    return deletedSubject;
  }

  addSubjectOnTeacher(addSubjectOnTeacherDto: any) {
    const { subjectId, teacherId } = addSubjectOnTeacherDto;
    return this.prisma.subjectOnTeacher.create({
      data: { subjectId, teacherId },
    });
  }
}
