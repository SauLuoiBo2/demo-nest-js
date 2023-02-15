import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './guard/gql.throttler.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
  ],
  exports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class ThrottlerAppModule {}
