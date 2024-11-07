import { QueueEvents } from 'bullmq';
import QueueManager from './QueueManager';

class QueueEventManager {
  private static eventListeners: { [key: string]: QueueEvents } = {};

  static registerEvents(queueName: string) {
    const events = new QueueEvents(queueName);
    events.on('completed', (jobId) => {
      console.log(`Job ${jobId} in ${queueName} has completed.`);
    });
    events.on('failed', (jobId, err) => {
      console.error(`Job ${jobId} in ${queueName} failed with error:`, err);
    });
    this.eventListeners[queueName] = events;
  }

  static initEventListeners() {
    for (const queueName in QueueManager.getQueues()) {
      this.registerEvents(queueName);
    }
  }
}

export default QueueEventManager;
