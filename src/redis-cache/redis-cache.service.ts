import { Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  private cache: Cache;

  async get(key: string): Promise<string> {
    return await this.cache.get(key);
  }

  async set(key: string, value: unknown) {
    await this.cache.set(key, value, 3600);
  }

  async reset() {
    await this.cache.reset();
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
