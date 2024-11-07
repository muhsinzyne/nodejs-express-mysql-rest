/* eslint-disable @typescript-eslint/no-explicit-any */
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

class BullMQConfig {
  private static redisConnection: IORedis;

  // Create and initialize the Redis connection
  private static initializeConnection(): IORedis {
    if (!this.redisConnection) {
      this.redisConnection = new IORedis({
        host: '127.0.0.1', // Redis host
        port: 6379, // Redis port
        maxRetriesPerRequest: null, // Avoid retries for blocking operations
      });
    }
    return this.redisConnection;
  }

  // Method to create a new Queue
  public static createQueue(queueName: string): Queue {
    const connection = this.initializeConnection();
    return new Queue(queueName, { connection });
  }

  // Method to create a new Worker
  public static createWorker(
    queueName: string,
    processJob: (job: any) => Promise<any>
  ): Worker {
    const connection = this.initializeConnection();
    return new Worker(queueName, processJob, { connection });
  }
}

export default BullMQConfig;
