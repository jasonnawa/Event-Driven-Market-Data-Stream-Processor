import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisProvider } from './redis.provider';

@Module({
  providers: [RedisProvider,RedisService],
  exports: [RedisProvider]
})
export class RedisModule {}
