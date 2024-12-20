import { Request, Response } from 'express';
import pool from '../config/database';
import { AppDataSource } from '../config/data-source';
// import { User } from '../typeorm/models/User';

import emailQueue from '../message-broker/queues/EmailQueue';
import { RequestBody } from '../types/request-body.interface';
import { StatusCodes } from '../constants/StatusCodes';

export const getExample = async (req: Request, res: Response) => {
  try {
    const requiredFields: string[] = ['test1', 'test2'];
    const fields: RequestBody = req.body;
    // Check for missing required fields using Object.prototype.hasOwnProperty.call()
    const missingFields: string[] = requiredFields.filter(
      (field) => !Object.prototype.hasOwnProperty.call(fields, field)
    );

    if (missingFields.length > 0) {
      return res.status(StatusCodes.HTTP_BAD_REQUEST).json({
        status: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

export const adapter = async (req: Request, res: Response) => {
  try {
    console.log('Test!!!!');

    addEmailJob();

    // const myQueue = BullMQConfig.createQueue('testABC');

    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });
    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });
    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });
    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });
    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });
    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });
    // await myQueue.add('my-job', { foo: 'bar' }, { delay: 10000 });

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const myWorker = BullMQConfig.createWorker('testABC', async (job) => {
    //   //console.log('Processing job', job.id, job.data);
    //   // Process the job here
    //   return Promise.resolve();
    // });

    // const userRepository = AppDataSource.getRepository(User);
    // const data = await userRepository.find();

    // res.json(data);

    res.status(500).json({ message: 'Error retrieving data' });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const addEmailJob = async () => {
  await emailQueue.add('sendEmail', {
    to: 'user@example.com',
    subject: 'Welcome to our platform!',
    body: 'Thank you for signing up.',
  });
};
