import { Job, Worker } from 'bullmq';
import { IFirebaseService } from '../../commons/firebase/interface/firebaseService.interface';
import { SendNotificationToUserDTO } from '../../commons/firebase/dto/sendNotificationToUser.dto';

export async function runNotificationWorker(firebaseService: IFirebaseService, connection: any) {
  const notificationsWorker = new Worker(
    'notificationQueue',
    async (job: Job) => {
      const notificationData: SendNotificationToUserDTO = job.data;
      const sendNotification = await firebaseService.sendNotificationToUser(notificationData);
      sendNotification;
    },
    { connection, autorun: false },
  );

  notificationsWorker.run();
}
