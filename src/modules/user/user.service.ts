import { CacheService } from './../../configs/cache/cache.service';
import { FileService } from './../../configs/file/file.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { forwardRef } from '@nestjs/common/utils';
import { Inject } from '@nestjs/common/decorators';
import { HashCodeService } from '@configs/hash-code/hash-code.service';
import {
  NotFoundException,
  Injectable,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '@prismaApp/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { createPaginator } from 'prisma-pagination';
import { Prisma, User } from '@prisma/client';
import { PaginateInput } from '@common/meta-list';
import { GraphQLError } from 'graphql';
import { QueryListUserInput } from './dto/query-list-user.input';
import { filterByContainsFunc, filterDateFunc } from 'src/utils/filter';
import { EmailService } from './../../configs/email/email.service';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hash: HashCodeService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
    private fileService: FileService,
    private cacheService: CacheService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async register(createUserInput: CreateUserInput) {
    const users = await this.prisma.user.findMany({
      where: {
        email: createUserInput.email,
      },
    });

    const existed = await this.cacheService.findOrCreateToken(
      'email',
      createUserInput.email,
    );
    if (existed) {
      throw new BadRequestException('Please try again after 15s');
    }

    if (users.length > 0) {
      throw new ForbiddenException(
        'Email has been created, please choose another email',
      );
    }

    const { password, ...tData } = createUserInput;
    const hashedPassword = await this.hash.hashCode(password);
    // const firstName = createUserInput.firstName;
    // const lastName = createUserInput.lastName;
    // const email = createUserInput.email;

    const { firstName, lastName, email } = tData;

    const data = {
      hashedPassword,
      ...tData,
    };

    const token = await this.authService.createToken(data);
    await this.emailService.sendUserConfirmation(
      email,
      token.accessToken,
      firstName + ' ' + lastName,
    );

    return data;
  }

  async createUserTest(createUserInput: CreateUserInput) {
    const users = await this.prisma.user.findMany({
      where: {
        email: createUserInput.email,
      },
    });
    if (users.length > 0) {
      throw new ForbiddenException(
        'Email has been created, please choose another email',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, firstName, lastName, email, ...tData } = createUserInput;
    const hashedPassword = await this.hash.hashCode(password);
    const data = {
      hashedPassword,
      firstName,
      lastName,
      email,
    };
    const createdUser = await this.prisma.user.create({ data });
    return createdUser;
  }

  async create(tokenVerify: string) {
    const allow = await this.authService.verifyEmail(tokenVerify);

    if (allow) {
      const payload = await this.jwtService.verify(tokenVerify, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      const firstName = payload.data[0].firstName;
      const lastName = payload.data[0].lastName;
      const email = payload.data[0].email;
      const hashedPassword = payload.data[0].hashedPassword;

      const data = {
        firstName,
        lastName,
        email,
        hashedPassword,
      };

      const createdUser = await this.prisma.user.create({ data });
      return createdUser;
    } else {
      throw new BadRequestException('Cannot create user');
    }
  }

  async findAll(
    paginateInput: PaginateInput,
    queryListUserInput?: QueryListUserInput,
  ) {
    const paginate = createPaginator({ ...paginateInput });

    // order by create at
    const orderCreatedAt = paginateInput.createAt;
    // Filter by name

    const lastName = filterByContainsFunc(queryListUserInput.lastName);

    // Filter by email

    const email = filterByContainsFunc(queryListUserInput.email);

    // filter by date create at

    const filterDateFunProps = {
      startDate: queryListUserInput.startDate,
      endDate: queryListUserInput.endDate,
    };

    const createdAt = filterDateFunc(filterDateFunProps);

    const result = await paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      {
        where: {
          AND: [{ lastName }, { email }, { createdAt }],
        },
        orderBy: {
          createdAt: orderCreatedAt,
        },
      },
    );
    return result;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User have id ' + id + ' not found');
    } else {
      return user;
    }
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
    userPassword?: string,
    forgotToken?: string,
  ) {
    try {
      const user = await this.findOne(id);
      const { avatar: avatarName } = user;
      const {
        password,
        oldPassword,
        avatar: avatarFile,
        ...dataUpdate
      } = updateUserInput;

      const avatarAdd = await this.fileService.getUpdateNameFile(
        avatarFile,
        avatarName,
        'avatar',
        'user',
      );

      if (password) {
        if (!forgotToken) {
          const isPasswordMatch = await this.hash.verifyCode(
            userPassword,
            password,
          );

          if (!isPasswordMatch) {
            throw new ForbiddenException('Wrong password');
          }

          if (password === oldPassword) {
            throw new ForbiddenException(
              'Old password can not be same with new password',
            );
          }

          const hashedPassword = await this.hash.hashCode(
            updateUserInput.password,
          );

          const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { ...dataUpdate, ...avatarAdd, hashedPassword },
          });
          return updatedUser;
        } else {
          const hashedPassword = await this.hash.hashCode(
            updateUserInput.password,
          );

          const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
              ...dataUpdate,
              ...avatarAdd,
              hashedPassword,
              forgotToken: null,
            },
          });
          return updatedUser;
        }
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { ...dataUpdate, ...avatarAdd },
      });
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('User have id ' + id + ' not found');
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      console.log(deletedUser);

      return deletedUser;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Do not delete user have id ' + id, {
        extensions: { code: HttpStatus.NOT_FOUND },
      });
    }
  }
}
