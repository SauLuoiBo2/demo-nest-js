import { ThrottlerAppModule } from './configs/throttler-app/throttler-app.module';
import { PrismaService } from '@prismaApp/prisma.service';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '@prismaApp/prisma.module';
import { GraphQLAppModule, ConfigAppModule } from './configs';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AccessTokenGuard } from './modules/auth/guard/access-token.guard';
// import { MessagesModule } from './modules/messages/messages.module';
import { LearnModule } from './modules/learn/learn.module';

import { FileModule } from '@configs/file/file.module';
import { GoogleAuthService } from './configs/google-auth/google-auth.service';
import { GoogleAuthModule } from './configs/google-auth/google-auth.module';
import { CacheSetupModule } from '@configs/cache/cache.module';
import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    PrismaModule,
    ConfigAppModule,
    GraphQLAppModule,
    AuthModule,
    UserModule,
    ThrottlerAppModule,
    // MessagesModule,
    LearnModule,
    FileModule,
    GoogleAuthModule,
    CacheSetupModule,
    ContentModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    GoogleAuthService,
  ],
})
export class AppModule {}
