// src/queues/EmailQueue.ts
import { Queue } from 'bullmq';
import { RedisOptions } from 'ioredis';

import config from './../../config/config';
// Define Redis connection options
const redisOptions: RedisOptions = {
  host: config.redisHost,
  port: config.redisPort, // Re
};

// Create the email queue
const orderCreatedQueue = new Queue('orderCreatedQueue', {
  connection: redisOptions,
});

export default orderCreatedQueue;
