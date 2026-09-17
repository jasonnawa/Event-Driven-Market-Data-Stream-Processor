import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';

const PING_INTERVAL_MS = 240_000; // 4 minutes — Render sleeps a free instance after ~15m idle
const PING_TIMEOUT_MS = 10_000;

@Injectable()
export class KeepAliveService {
  private readonly logger = new Logger(KeepAliveService.name);
  private readonly baseUrl: string | undefined;

  constructor(private readonly configService: ConfigService) {
    // RENDER_EXTERNAL_URL is injected by Render; KEEP_ALIVE_URL is an optional override.
    this.baseUrl =
      this.configService.get<string>('KEEP_ALIVE_URL') ??
      this.configService.get<string>('RENDER_EXTERNAL_URL');

    if (!this.baseUrl) {
      this.logger.log('No external URL configured — self-ping disabled');
    }
  }

  @Interval(PING_INTERVAL_MS)
  async pingSelf() {
    // Skipped locally: the ping only works when it exits and re-enters via the platform router.
    if (!this.baseUrl) return;

    const url = `${this.baseUrl.replace(/\/$/, '')}/health`;

    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(PING_TIMEOUT_MS),
      });
      this.logger.debug(`Self-ping ${url} -> ${res.status}`);
    } catch (err) {
      this.logger.warn(`Self-ping failed: ${err instanceof Error ? err.message : err}`);
    }
  }
}
