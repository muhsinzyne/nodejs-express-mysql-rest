// src/processors/emailProcessor.ts
import { Job } from 'bullmq';

export const resetAccountProcessor = async (job: Job) => {
  console.log('Processing job:', job.id, job.data);
  console.log(`sample resetAccountProcessor`);
  // Implement your email sending logic here, such as using nodemailer or another service
};
