import { Injectable, Logger } from "@nestjs/common";
import { stocks } from "./dto/stock-types";
import { Interval } from "@nestjs/schedule";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class StockSimulatorService {

    constructor(private eventEmitter: EventEmitter2) {}
    private readonly logger = new Logger(StockSimulatorService.name);
    public getAvailableStock() {
        let stockData = stocks
        return { status: true, message: 'available stock fetched successfully', data: stockData }
    }



    @Interval(1000)
    emitStockTicks() {
        for (const stock of stocks) {
            const oldPrice = stock.currentPrice
            const newPrice = this.fluctuatePrice(oldPrice);
            stock.currentPrice = newPrice;

            const tick: StockTickDTO = {
                symbol: stock.symbol,
                name: stock.name,
                price: newPrice,
                timestamp: new Date().toISOString(),
            };

            this.eventEmitter.emit('stock.tick', tick);
            //this.logger.debug(`Emitted tick: ${stock.symbol} -> $${newPrice.toFixed(2)}`);
        }
    }

    private fluctuatePrice(price: number): number {
        const changePercent = (Math.random() - 0.5) * 0.02; // ±1%
        return +(price * (1 + changePercent)).toFixed(2);
    }
}