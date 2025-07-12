import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheManagerStore } from 'cache-manager';
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cache: CacheManagerStore){}
  getHello(): string {
    return 'Hello World!';
  }

   async testRedisCache(): Promise<void> {
    try {
      await this.cache.set('test-key', 'Redis is working!', 60000);
      const value = await this.cache.get('test-key');
      console.log('✅ Cache test result:', value);
    } catch (err) {
      console.error('❌ Redis cache test failed:', err);
    }
  }
}
