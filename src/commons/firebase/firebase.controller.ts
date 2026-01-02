import { Request, Response } from 'express';
import { IFirebaseService } from './interface/firebaseService.interface';

export class FirebaseController {
  private firebaseService: IFirebaseService;
  constructor(firebaseService: IFirebaseService) {
    this.firebaseService = firebaseService;
  }

  registerToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { deviceToken } = req.body;
      const { statusCode, ...response } = await this.firebaseService.registerToken({
        userId,
        deviceToken,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  sendNotificationToUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, deviceToken } = req.body;
      const { statusCode, ...response } = await this.firebaseService.sendNotificationToUser({
        description: 'das',
        title: 'das',
        deviceToken,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
