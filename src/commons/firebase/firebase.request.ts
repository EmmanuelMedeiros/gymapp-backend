import { Request } from 'express';
import zod from 'zod';
import { RegisterTokenDTO } from './dto/registerToken.dto';
import { SendNotificationToUserDTO } from './dto/sendNotificationToUser.dto';

class FirebaseRequest {
  registerTokenRequest(req: Request): any {
    const createSchema: zod.ZodType<Omit<RegisterTokenDTO, 'userId'>> = zod.object({
      deviceToken: zod.string('Device token must be a string'),
      userId: zod.number('User ID must be a number'),
    });

    return createSchema.safeParse(req.body);
  }

  sendNotificationToUserRequest(req: Request): any {
    const sendNotificationSchema: zod.ZodType<SendNotificationToUserDTO> = zod.object({
      description: zod.string('Notiifcation description must be a string'),
      deviceToken: zod.string('Device token must be a string'),
      title: zod.string('Notification title must be a string'),
    });

    return sendNotificationSchema.safeParse(req.body);
  }
}

export default new FirebaseRequest();
