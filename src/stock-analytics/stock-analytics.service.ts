import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';

@Injectable()
export class StockAnalyticsService {
    private readonly logger = new Logger(StockAnalyticsService.name)
    constructor(){}
    
 
}
