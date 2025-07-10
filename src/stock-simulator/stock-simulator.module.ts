import { Module } from '@nestjs/common';
import { StockSimulatorController } from './stock-simulator.controller';
import { StockSimulatorService } from './stock-simulator.service';
@Module({
  imports: [],
  controllers: [StockSimulatorController],
  providers: [StockSimulatorService],
})
export class StockSimulatorModule {}
