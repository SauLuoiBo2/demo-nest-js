import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 3_600_000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheSetupModule {}
