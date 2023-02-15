import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { PrismaService } from '@prismaApp/prisma.service';
import { SlugService } from '@configs/slug/slug.service';
@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService, private slug: SlugService) {}

  async findBySlug(slug: string) {
    return await this.prisma.subject.findUnique({
      where: {
        slug,
      },
    });
  }

  async _findOneByCode(code: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { code },
      include: {
        teachers: {
          select: { teacher: true, teacherId: true },
        },
      },
    });

    return subject;
  }

  private async findSlugs(slug: string) {
    return await this.prisma.subject.findMany({
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

  async create(createSubjectInput: CreateSubjectInput) {
    const subject = await this.prisma.subject.findMany({
      where: {
        OR: [
          {
            name: createSubjectInput.name,
          },
        ],
      },
    });

    if (subject.length > 0) {
      throw new ForbiddenException(
        'subjectName or id created, please choose other',
      );
    }

    const slug = await this.uniqueSlug(createSubjectInput.name);

    const data = {
      ...createSubjectInput,
      slug,
    };

    const createdSubject = await this.prisma.subject.create({
      data,
    });

    return createdSubject;
  }

  async findAll() {
    const result = await this.prisma.subject.findMany({
      orderBy: { id: 'desc' },
      include: {
        _count: true,
      },
    });

    return result;
  }

  async findOne(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: {
        _count: true,
      },
    });

    if (!subject) {
      throw new NotFoundException('subject have id ' + id + ' not found');
    } else {
      return subject;
    }
  }

  async findOneByCode(code: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { code },
    });

    if (!subject) {
      throw new NotFoundException('subject have id ' + code + ' not found');
    } else {
      return subject;
    }
  }

  async update(id: number, updateSubjectInput: UpdateSubjectInput) {
    const subject = await this.prisma.subject.findUnique({ where: { id } });

    if (!subject) {
      throw new NotFoundException('subject have id ' + id + ' not found');
    } else {
      const data = {
        name: updateSubjectInput.name,
        code: undefined,
        slug: undefined,
      };

      // code

      if (updateSubjectInput.code && subject.code !== updateSubjectInput.code) {
        const uniqueSubjectByCode = await this._findOneByCode(
          updateSubjectInput.code,
        );

        if (uniqueSubjectByCode) {
          throw new NotFoundException(
            'subject have code ' + uniqueSubjectByCode.code + ' da ton tai',
          );
        } else {
          data.code = updateSubjectInput.code;
        }
      }

      // slug

      if (updateSubjectInput.name) {
        const slug = await this.uniqueSlug(updateSubjectInput.name);

        data.slug = slug;
      }

      const updatedSubject = await this.prisma.subject.update({
        where: { id },
        data,
      });

      return updatedSubject;
    }
  }

  async remove(id: number) {
    const subject = await this.prisma.subject.findUnique({ where: { id } });

    if (!subject) {
      throw new NotFoundException('subject have id ' + id + ' not found');
    } else {
      try {
        const deletedSubject = await this.prisma.subject.delete({
          where: { id },
        });

        return deletedSubject;
      } catch (error) {
        throw new NotFoundException(
          'subject have name ' + subject.name + ' cannot delete',
        );
      }
    }
  }
}
