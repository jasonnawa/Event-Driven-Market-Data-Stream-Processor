import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSimulatorModule } from './stock-simulator/stock-simulator.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { StockAnalyticsModule } from './stock-analytics/stock-analytics.module';
import { ConfigModule} from '@nestjs/config';
import { StockIngestorModule } from './stock-ingestor/stock-ingestor.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    StockSimulatorModule,
    StockAnalyticsModule,
    StockIngestorModule,
    RedisModule,
    UserModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
