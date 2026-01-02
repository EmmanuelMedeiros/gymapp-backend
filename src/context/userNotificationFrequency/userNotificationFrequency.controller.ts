import { Request, Response } from "express";
import { IUserNotificationFrequencyService } from "./interface/userNotificationFrequencyService.interface";

export class UserNotificationFrequecyController {
  private userNotificationFrequencyService: IUserNotificationFrequencyService;

  constructor(
    userNotificationFrequencyService: IUserNotificationFrequencyService
  ) {
    this.userNotificationFrequencyService = userNotificationFrequencyService;
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const notificationFrequencyId = req.params.id;
      const { statusCode, ...response } = await this.userNotificationFrequencyService.delete(Number(notificationFrequencyId));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { statusCode, ...response } = await this.userNotificationFrequencyService.getByUserId(req.user.id);
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  updateByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { hour, weekDays } = req.body;

      const { statusCode, ...response } = await this.userNotificationFrequencyService.updateByUserId({
        userId: req.user.id,
        hour,
        weekDays,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { hour, weekDays } = req.body;
      const userId = req.user.id;
      const { statusCode, ...response } =
        await this.userNotificationFrequencyService.create({
          hour,
          userId,
          weekDays,
        });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
