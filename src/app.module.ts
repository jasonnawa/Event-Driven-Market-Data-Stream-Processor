import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSimulatorModule } from './stock-simulator/stock-simulator.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    StockSimulatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
