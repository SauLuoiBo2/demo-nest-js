import { GoogleAuthService } from './../../configs/google-auth/google-auth.service';
import { UpdateUserInput } from './../user/dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { EmailService } from './../../configs/email/email.service';
import { ForgotInput } from './dto/forgot.input';
import { UserService } from './../user/user.service';
import { AuthConfig } from './config/index';
import { RoleE } from 'src/modules/auth/role/roles.enum';
import { LogoutResponse } from './dto/logout.response';
import { SignResponse } from './dto/sign-response';
import { HashCodeService } from '@configs/hash-code/hash-code.service';
import { SigninInput } from './dto/signin.input';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prismaApp/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateTokenI, CreateTokensI } from './types';
import { getTimeAccessToken } from 'src/utils/time/get-time-access-token.fun';
import * as dayjs from 'dayjs';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
const { Jwt } = AuthConfig;

const { access_token_time, refressh_token_time } = Jwt;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashCodeService: HashCodeService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async verifyEmail(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    const email = payload.data[0].email;

    if (typeof payload === 'object' && email) {
      return true;
    }

    return false;
  }

  async createToken(...data): Promise<CreateTokenI> {
    const dataSign = { data };
    const accessToken = await this.jwtService.sign(
      { ...dataSign },
      {
        expiresIn: access_token_time,
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );

    return { accessToken };
  }

  async createTokens(
    userId: number,
    email: string,
    role: RoleE,
  ): Promise<CreateTokensI> {
    const dataSign = { userId, email, role };
    const accessToken = await this.jwtService.sign(
      { ...dataSign },
      {
        expiresIn: access_token_time,
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = await this.jwtService.sign(
      { ...dataSign, accessToken },
      {
        expiresIn: refressh_token_time,
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async getNewTokens(userId: number, rft: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const { hashedRefreshToken } = user;
    const isRefreshTokenMatch = await this.hashCodeService.verifyCode(
      hashedRefreshToken,
      rft,
    );
    if (!isRefreshTokenMatch) {
      throw new ForbiddenException('Access denied');
    }
    console.log(userId);

    const { accessToken } = await this.createTokens(
      user.id,
      user.email,
      user.role as any,
    );

    const expiredAt = getTimeAccessToken(access_token_time);

    return {
      accessToken,
      refreshToken: rft,
      expiredAt,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashCodeService.hashCode(
      refreshToken,
    );

    const id = userId;

    await this.prisma.user.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }

  async login(signinInput: SigninInput): Promise<SignResponse> {
    const { email: emailLogin, password } = signinInput;

    const user = await this.prisma.user.findUnique({
      where: { email: emailLogin },
    });

    if (!user) {
      throw new ForbiddenException('Not found user');
    }

    if (user.isGoogle === true) {
      throw new ForbiddenException('You must login by google');
    }

    const { hashedPassword } = user;

    const isPasswordMatch = await this.hashCodeService.verifyCode(
      hashedPassword,
      password,
    );

    if (!isPasswordMatch) {
      throw new ForbiddenException('Wrong password');
    }

    const userId = user.id;
    const email = user.email;
    const role = user.role;
    const userData = {
      userId,
      email,
      role,
    };

    const { refreshToken, accessToken } = await this.createTokens(
      userId,
      email,
      role as any,
    );

    await this.updateRefreshToken(userId, refreshToken);

    const expiredAt = getTimeAccessToken('5m');

    const result = {
      user: userData,
      refreshToken,
      accessToken,
      expiredAt,
    };

    return result;
  }

  // async loginGoogle() {}

  async logout(userId: number): Promise<LogoutResponse> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { hashedRefreshToken: null },
    });

    return {
      isLoggedOut: true,
    };
  }

  async checkSendEmail(
    emailedAt: Date,
    value: number,
    timeUnitType: dayjs.ManipulateType,
    email: string,
    token: string,
    fullname: string,
    id?: number,
  ) {
    // const dateNow = dayjs().format('DD-MM-YYYY HH:mm:ss')
    const dateNow = dayjs();
    const dateAfter = dayjs(emailedAt).add(value, timeUnitType);

    if (dateNow.isAfter(dateAfter)) {
      await this.emailService.sendUserConfirmation(email, token, fullname);

      await this.prisma.user.update({
        where: { id },
        data: {
          forgotToken: token,
          emailedAt: new Date(),
        },
      });
    } else {
      console.log('chua het h');
      // throw new BadRequestException()
    }
  }

  async forgot(forgotInput: ForgotInput) {
    const { email } = forgotInput;

    const user = await this.prisma.user.findUnique({ where: { email: email } });
    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const emailedAt = user.emailedAt;

    if (!user) {
      throw new ForbiddenException('Not found user');
    }

    const token = await this.createToken(user.id);
    const forgotToken = token.accessToken;

    this.checkSendEmail(
      emailedAt,
      15,
      's',
      email,
      forgotToken,
      firstName + ' ' + lastName,
      id,
    );
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
    updateUserInput: UpdateUserInput,
    forgotToken?: string,
  ) {
    if (!forgotToken) {
      const { email } = changePasswordInput;
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
      const id = user.id;
      const password = user.hashedPassword;

      if (!user) {
        throw new ForbiddenException('Not found user');
      }

      await this.userService.update(id, updateUserInput, password);
    } else {
      const payload = await this.jwtService.verify(forgotToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'userId' in payload) {
        const id = payload.userId;
        await this.userService.update(id, updateUserInput, null, forgotToken);
      }
    }
  }
}
