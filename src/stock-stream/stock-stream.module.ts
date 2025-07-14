import { Module } from '@nestjs/common';
import { StockStreamGateway } from './stock-stream.gateway';

@Module({
    providers: [StockStreamGateway]
})
export class StockStreamModule {}
