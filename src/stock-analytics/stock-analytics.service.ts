import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { StockAlertEvent } from 'src/stock-ingestor/events/stock-alert.event';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class StockAnalyticsService {
  private readonly logger = new Logger(StockAnalyticsService.name)
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) { }

  @OnEvent('stock.alert')
  async handleAlert(event: StockAlertEvent) {
    const { symbol, percentageChange } = event
    //TODO: add message payload into queue(rabbitMQ).

    const users = await this.userService.getUsersPerStockSymbol(symbol)
    for (const email of users) {
      await this.notificationService.sendEmail(
        email,
        `🚨 ${symbol} Alert!`,
        `The stock ${symbol} has moved ${percentageChange.toFixed(2)}% in the last 10 minutes.`
      );
    }

  }

}
