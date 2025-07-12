import { Module } from '@nestjs/common';
import { StockAnalyticsService } from './stock-analytics.service';

@Module({
  providers: [StockAnalyticsService]
})
export class StockAnalyticsModule {}
