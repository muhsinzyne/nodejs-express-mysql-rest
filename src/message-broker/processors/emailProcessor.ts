// src/processors/emailProcessor.ts
import { Job } from 'bullmq';

export const emailProcessor = async (job: Job) => {
  console.log('Processing job:', job.id, job.data);
  console.log(
    `Sending email to: ${job.data.to} with subject: ${job.data.subject}`
  );
  // Implement your email sending logic here, such as using nodemailer or another service
};
