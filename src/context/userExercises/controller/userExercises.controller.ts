import { Request, Response } from "express";
import { IUserExercisesService } from "../interface/userExercisesService.interface";

export class UserExercisesController {
  private userExercisesService: IUserExercisesService;

  constructor(userExercisesService: IUserExercisesService) {
    this.userExercisesService = userExercisesService;
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { muscularGroupId, weekDay, weight, title } = req.body;
      const { statusCode, ...response } =
        await this.userExercisesService.create({
          muscularGroupId,
          weekDay,
          weight,
          title,
        });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
