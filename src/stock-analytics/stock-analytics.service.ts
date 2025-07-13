import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { StockAlertEvent } from 'src/stock-ingestor/events/stock-alert.event';
@Injectable()
export class StockAnalyticsService {
    private readonly logger = new Logger(StockAnalyticsService.name)
    constructor(){}
    
      @OnEvent('stock.alert')
  handleAlert(event: StockAlertEvent) {
    console.log(`📢 ALERT: ${event.symbol} moved ${event.percentageChange.toFixed(2)}%`);
    // TODO: send email, notify users, etc.
  }
 
}
