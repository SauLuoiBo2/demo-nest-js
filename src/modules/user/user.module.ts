import { CacheSetupModule } from '@configs/cache/cache.module';
import { FileModule } from '@configs/file/file.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from './../auth/auth.module';
import { EmailModule } from './../../configs/email/email.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '@prismaApp/prisma.module';
import { HashCodeModule } from '@configs/hash-code/hash-code.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [PrismaModule, HashCodeModule, JwtModule, EmailModule, FileModule, CacheSetupModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
