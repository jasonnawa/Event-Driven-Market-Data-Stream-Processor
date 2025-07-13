import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: (configService: ConfigService) => {
    const uri = configService.get<string>('REDIS_URI');
    if (!uri) {
      throw new Error('REDIS_URI is not defined in environment variables');
    }
    return new Redis(uri);
  },
  inject: [ConfigService],
};

