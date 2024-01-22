/**
 *
 */
import redis, { createClient } from 'redis';
import { logger } from '../logger/logger.configuration';

export class RedisConfig {
  private host: string;
  private port: number;
  private client: redis.RedisClientType;

  constructor(host: string, port: number, password?: string) {
    this.host = host;
    this.port = port;
    this.client = createClient({
      socket: {
        host: this.host,
        port: this.port,
      },
    });
    this.client.on('error', (err: any) => logger.error(err));
    this.client.on('connect', () =>
      logger.info({
        action: 'redis',
        message: `redis run at ${this.host}:${this.port}`,
      })
    );
    this.client.connect();
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key: string, value: string) {
    await this.client.set(key, value);
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}
