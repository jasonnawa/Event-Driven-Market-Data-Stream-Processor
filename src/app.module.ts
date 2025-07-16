import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { StockSimulatorModule } from './stock-simulator/stock-simulator.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { StockAnalyticsModule } from './stock-analytics/stock-analytics.module';
import { ConfigModule} from '@nestjs/config';
import { StockIngestorModule } from './stock-ingestor/stock-ingestor.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { StockStreamModule } from './stock-stream/stock-stream.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    StockSimulatorModule,
    StockAnalyticsModule,
    StockIngestorModule,
    RedisModule,
    UserModule,
    NotificationModule,
    StockStreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
