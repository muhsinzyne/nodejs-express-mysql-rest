// src/queues/QueueManager.ts
import { Queue, Worker } from 'bullmq';
import { RedisOptions } from 'ioredis';
import {
  emailProcessor,
  signupProcessor,
  resetAccountProcessor,
  orderCreatedProcessor,
  orderDeliveredProcessor,
} from './processors';

// Define Redis connection options
const redisOptions: RedisOptions = {
  host: '127.0.0.1', // Redis host
  port: 6379, // Redis port
};

class QueueManager {
  private static queues: { [key: string]: Queue } = {};

  static initQueues() {
    console.log('===========queue initializing!!!!!!!!=====');
    // Initialize queues
    this.queues['emailQueue'] = new Queue('emailQueue', {
      connection: redisOptions,
    });
    this.queues['signupQueue'] = new Queue('signupQueue', {
      connection: redisOptions,
    });
    this.queues['resetAccountQueue'] = new Queue('resetAccountQueue', {
      connection: redisOptions,
    });
    this.queues['orderCreatedQueue'] = new Queue('orderCreatedQueue', {
      connection: redisOptions,
    });
    this.queues['orderDeliveredQueue'] = new Queue('orderDeliveredQueue', {
      connection: redisOptions,
    });

    this.initWorkers();
  }

  private static initWorkers() {
    // Initialize workers for each queue
    new Worker('emailQueue', emailProcessor, { connection: redisOptions });
    new Worker('signupQueue', signupProcessor, { connection: redisOptions });
    new Worker('resetAccountQueue', resetAccountProcessor, {
      connection: redisOptions,
    });
    new Worker('orderCreatedQueue', orderCreatedProcessor, {
      connection: redisOptions,
    });
    new Worker('orderDeliveredQueue', orderDeliveredProcessor, {
      connection: redisOptions,
    });
  }

  static getQueue(queueName: string): Queue | undefined {
    return this.queues[queueName];
  }

  static getQueues() {
    return this.queues;
  }
}

export default QueueManager;
