import { Module } from '@nestjs/common';
import { StockIngestorService } from './stock-ingestor.service';

@Module({
  providers: [StockIngestorService]
})
export class StockIngestorModule {}
