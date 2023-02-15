import { GoogleAuthModule } from './../../configs/google-auth/google-auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { UserModule } from './../user/user.module';
import { EmailModule } from './../../configs/email/email.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { HashCodeModule } from '@configs/hash-code/hash-code.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [
    PrismaModule,
    HashCodeModule,
    JwtModule,
    EmailModule,
    forwardRef(() => GoogleAuthModule),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
