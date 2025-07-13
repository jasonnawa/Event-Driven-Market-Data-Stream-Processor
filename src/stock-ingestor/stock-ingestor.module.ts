import { Module } from '@nestjs/common';
import { StockIngestorService } from './stock-ingestor.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [StockIngestorService]
})
export class StockIngestorModule {}
