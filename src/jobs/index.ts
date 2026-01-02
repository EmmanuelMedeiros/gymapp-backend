import { JobsOptions, Queue } from 'bullmq';
import { IFirebaseService } from '../commons/firebase/interface/firebaseService.interface';
import IORedis from 'ioredis';
import { Queue as QueueName } from './enum/queue.enum';
import { runNotificationWorker } from './worker';
require('dotenv').config();

const connection = new IORedis({ 
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  maxRetriesPerRequest: null,
 });
const notificationQueue = new Queue('notificationQueue', { connection });

export class SystemJobs {
  private fireBaseService: IFirebaseService;

  private hasWorkersStarted: boolean = false;
  constructor(firebaseService: IFirebaseService) {
    this.fireBaseService = firebaseService;
  }

  initalize = () => {
    if (this.hasWorkersStarted) {
      return;
    }
    runNotificationWorker(this.fireBaseService, connection);
    this.hasWorkersStarted = true;
  };

  static registerJob = async (queueName: QueueName, jobData: { name: string, data: any, attributes?: JobsOptions }) => {
    let inCaseQueue: Queue;
    switch (queueName) {
      case QueueName.NotificationQueue:
        inCaseQueue = notificationQueue;
      default: inCaseQueue = notificationQueue;
    }
    await inCaseQueue.add(
      jobData.name,
      jobData.data,
      {...jobData.attributes},
    )
  };
}
