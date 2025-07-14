import { Module } from '@nestjs/common';
import { StockAnalyticsService } from './stock-analytics.service';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [UserModule, NotificationModule],
  providers: [StockAnalyticsService]
})
export class StockAnalyticsModule {}
