// stock-ingestor.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { StockAlertEvent } from './events/stock-alert.event';
import Redis from 'ioredis';
@Injectable()
export class StockIngestorService {
  private readonly logger = new Logger(StockIngestorService.name)
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private eventEmitter: EventEmitter2
  ) { }

  @OnEvent('stock.tick')
  async stockTickDataIngestor(payload: StockTickDTO) {
    //this.logger.debug(`stock tick data received -> ${payload.symbol}`)
    await this.updateMonotonicQueues(payload.symbol, payload.price, payload.timestamp)
  }


 async updateMonotonicQueues(symbol: string, price: number, timestamp: number) {
  const highKey = `tick:high:${symbol}`;
  const lowKey = `tick:low:${symbol}`;
  const cutoff = timestamp - 600_000;

  // Add current price: score = price, value = timestamp
  await this.redis.zadd(highKey, price, timestamp.toString());
  await this.redis.zadd(lowKey, price, timestamp.toString());

  // Clean up old entries manually
  const highEntries = await this.redis.zrange(highKey, 0, -1, 'WITHSCORES');
  const lowEntries = await this.redis.zrange(lowKey, 0, -1, 'WITHSCORES');

  const highToDelete: string[] = [];
  for (let i = 0; i < highEntries.length; i += 2) {
    const value = highEntries[i]; // timestamp string
    const score = parseFloat(highEntries[i + 1]); // price
    if (parseInt(value) < cutoff) {
      console.log('adding to delete', value, score)
      highToDelete.push(value);
    }
  }

  const lowToDelete: string[] = [];
  for (let i = 0; i < lowEntries.length; i += 2) {
    const value = lowEntries[i];
    const score = parseFloat(lowEntries[i + 1]);
    if (parseInt(value) < cutoff) {
      lowToDelete.push(value);
    }
  }

  if (highToDelete.length) {
    await this.redis.zrem(highKey, ...highToDelete);
  }
  if (lowToDelete.length) {
    await this.redis.zrem(lowKey, ...lowToDelete);
  }

  // Now get current max and min prices
  const [maxTimestamp, maxStr] = await this.redis.zrevrange(highKey, 0, 0, 'WITHSCORES');
  const [minTimestamp, minStr] = await this.redis.zrange(lowKey, 0, 0, 'WITHSCORES');

  if (!maxStr || !minStr) {
    console.warn(`No valid prices for ${symbol}`);
    return;
  }

  const maxPrice = parseFloat(maxStr);
  const minPrice = parseFloat(minStr);

const cooldownKey = `alert:${symbol}`;
const cooldownTTL = 2 * 60 * 60 * 1000; // 2 hours

if (maxPrice / minPrice >= 1.1 && !(await this.redis.get(cooldownKey))) {
  const percentage = ((maxPrice - minPrice) / minPrice) * 100;

   const setResult = await this.redis.set(cooldownKey, 'true', 'PX', cooldownTTL, 'NX');

  if (!setResult) {
    return;
  }

  this.eventEmitter.emit('stock.alert', { symbol, percentageChange: percentage });

} else if (minPrice / maxPrice <= 0.9 && !(await this.redis.get(cooldownKey))) {
  const percentage = ((minPrice - maxPrice) / maxPrice) * 100;

    const setResult = await this.redis.set(cooldownKey, 'true', 'PX', cooldownTTL, 'NX');

  if (!setResult) {
    return;
  }

  this.eventEmitter.emit('stock.alert', { symbol, percentageChange: percentage });
}


  this.logger.debug(`Symbol: ${symbol}, Min: ${minPrice}, Max: ${maxPrice}, Ratio: ${(maxPrice / minPrice).toFixed(3)}`);
  this.eventEmitter.emit('stock.percentage.change', { symbol, price, percentageChange: ((minPrice - maxPrice) / maxPrice) * 100 });
}


}
