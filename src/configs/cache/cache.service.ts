import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findOrCreateToken(key: string, value?: string) {
    const val = await this.cacheManager.get(key);
    if (val) {
      return true;
    }

    await this.cacheManager.set(key, value, 50000);
    return false;
  }

  async clearCache(cacheKey: string) {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(cacheKey)) {
        this.cacheManager.del(key);
      }
    });
  }
}
