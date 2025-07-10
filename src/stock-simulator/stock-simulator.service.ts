import { Injectable } from "@nestjs/common";
import { stocks } from "./dto/stock-types";

@Injectable()
export class StockSimulatorService {
    constructor() {}

    public getAvailableStock() {
        let stockData = stocks
        return { status: true, message: 'available stock fetched successfully', data: stockData }
    }

}