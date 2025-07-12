import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSimulatorModule } from './stock-simulator/stock-simulator.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { StockAnalyticsModule } from './stock-analytics/stock-analytics.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis'; 
import { StockIngestorModule } from './stock-ingestor/stock-ingestor.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
     CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => ({
        stores: [
          new KeyvRedis(configService.get<string>('REDIS_URI'))
        ],
      }),
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    StockSimulatorModule,
    StockAnalyticsModule,
    StockIngestorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
