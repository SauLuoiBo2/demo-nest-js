import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from './../../modules/auth/auth.module';
import { PrismaModule } from '@prismaApp/prisma.module';
import { GoogleAuthService } from './google-auth.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GoogleAuthService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
