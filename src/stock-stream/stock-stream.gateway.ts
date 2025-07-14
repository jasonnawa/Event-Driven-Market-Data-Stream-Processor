import {
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { StockPercentageDto } from 'src/stock-simulator/dto/stock-percentage.dto';

@WebSocketGateway({
    cors: {
        origin: '*', //TODO: add client origin
    },
})
export class StockStreamGateway {
    private readonly logger = new Logger(StockStreamGateway.name)
    @WebSocketServer()
    server: Server;

    @OnEvent('stock.tick')
    handleStockTick(payload: StockTickDTO) {
        this.server.emit('stock:tick', payload);
        //this.logger.debug(`sent ${payload.symbol}-${payload.price} at ${payload.timestamp}`)
    }

    @OnEvent('stock.percentage.change')
    handleStockPercentageChange(payload: StockPercentageDto) {
        this.server.emit('stock:percentage.change', payload);
        this.logger.debug(`sent ${payload.symbol}- at ${payload.price} with a ${payload.percentageChange} change`)
    }
}
