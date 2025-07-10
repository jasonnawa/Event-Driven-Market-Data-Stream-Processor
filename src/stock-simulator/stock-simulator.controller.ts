import { Controller } from "@nestjs/common";
import { StockSimulatorService } from "./stock-simulator.service";
import { Get } from "@nestjs/common";


@Controller('stock-simulator')
export class StockSimulatorController {
    constructor(private readonly stockSimulatorService: StockSimulatorService) { }

    @Get()
    getAvailableStock() {
        const response = this.stockSimulatorService.getAvailableStock();
        return response    
    }

}