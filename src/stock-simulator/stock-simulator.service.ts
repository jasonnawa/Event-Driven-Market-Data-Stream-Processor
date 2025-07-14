import { Injectable, Logger } from "@nestjs/common";
import { stocks } from "./dto/stock-types";
import { Interval } from "@nestjs/schedule";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class StockSimulatorService {

    constructor(private eventEmitter: EventEmitter2) { }
    private readonly logger = new Logger(StockSimulatorService.name);
    private getRandomSubset<T>(array: T[], count: number): T[] {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    public getAvailableStock() {
        let stockData = stocks
        return { status: true, message: 'available stock fetched successfully', data: stockData }
    }



    @Interval(2500)
    emitStockTicks() {
        const count = Math.floor(Math.random() * 3) + 2; // 2 to 4 stocks
        const selected = this.getRandomSubset(stocks, count);

        for (const stock of selected) {
            const oldPrice = stock.currentPrice;
            const newPrice = this.fluctuatePrice(oldPrice);
            stock.currentPrice = newPrice;

            const tick: StockTickDTO = {
                symbol: stock.symbol,
                name: stock.name,
                price: newPrice,
                timestamp: Date.now(),
            };

            this.eventEmitter.emit('stock.tick', tick);
        }
    }


    private fluctuatePrice(price: number): number {
        const changePercent = (Math.random() - 0.5) * 0.01; // ±0.5%
        return +(price * (1 + changePercent)).toFixed(2);
    }
}