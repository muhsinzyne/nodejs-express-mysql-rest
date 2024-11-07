import express from 'express';
import dotenv from 'dotenv';
import apiRoute from './routes';
import QueueManager from './message-broker/QueueManager';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'; // Import the correct adapter
import path from 'path';

// Load environment variables
const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
dotenv.config({ path: envFile });

// Log current environment
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
} else {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
}

const adminQueue = '/admin/queue-dashboard';
const app = express();
// Middleware for JSON parsing
app.use(express.json());

// Serve static files (e.g., CSS, JS for Bull-Board UI)
app.use(
  '/static',
  express.static(path.join(__dirname, 'node_modules/@bull-board/ui/dist'))
);

// Use your API route
app.use('/api/v1', apiRoute);

// Initialize the queues from QueueManager
QueueManager.initQueues();

// Create an Express Adapter instance
const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath(adminQueue);

// Set up the Bull-Board API using the correct method
const bullQueues = Object.values(QueueManager.getQueues()).map(
  (queue) => new BullMQAdapter(queue)
);

console.log('i am loading from here!!!');
createBullBoard({
  queues: bullQueues,
  serverAdapter: serverAdapter,
});

// Now you can use the `serverAdapter` to attach the router to your express app
app.use(adminQueue, serverAdapter.getRouter()); // Access the UI at /admin/queues

export default app;
