// src/queues/EmailQueue.ts
import { Queue } from 'bullmq';
import { RedisOptions } from 'ioredis';

// Define Redis connection options
const redisOptions: RedisOptions = {
  host: '127.0.0.1', // Redis host
  port: 6379, // Re
};

// Create the email queue
const emailQueue = new Queue('emailQueue', { connection: redisOptions });

export default emailQueue;
