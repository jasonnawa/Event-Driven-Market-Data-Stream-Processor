// stock-ingestor.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class StockIngestorService {
  private readonly logger = new Logger(StockIngestorService.name)
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) { }

  @OnEvent('stock.tick')
  async stockTickDataIngestor(payload: StockTickDTO) {
    //this.logger.debug(`stock tick data received -> ${payload.symbol}`)
    const key = `tick:${payload.symbol}:${payload.timestamp}`;
    const ttlInMilliSeconds = 60000;


    await this.cache.set(key, payload, ttlInMilliSeconds);

 
  }
}
