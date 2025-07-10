import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSimulatorModule } from './stock-simulator/stock-simulator.module';

@Module({
  imports: [StockSimulatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
