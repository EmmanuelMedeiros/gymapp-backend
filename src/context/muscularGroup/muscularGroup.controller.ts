import { Request, Response } from 'express';
import { IMuscularGroupService } from './interface/muscularGroupService.interface';
import { IUserMuscularGroupService } from './interface/userMuscularGroupService.interface';

export class MuscularGroupController {
  muscularGroupService: IMuscularGroupService;

  userMuscularGroupService: IUserMuscularGroupService;

  constructor(
    muscularGroupService: IMuscularGroupService,
    userMuscularGroupService: IUserMuscularGroupService,
  ) {
    this.muscularGroupService = muscularGroupService;
    this.userMuscularGroupService = userMuscularGroupService;
  }

  createUserMuscularGroup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { muscularGroupId, weekDays } = req.body;
      const { statusCode, ...response } = await this.userMuscularGroupService.create({
        userId,
        muscularGroupId,
        weekDays,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  getAllMuscularGroups = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { statusCode, ...response } = await this.muscularGroupService.getAll();
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  deleteMuscularGroupById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const { statusCode, ...response } = await this.muscularGroupService.deleteById(Number(id));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  getMuscularGroupById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const { statusCode, ...response } = await this.muscularGroupService.getById(Number(id));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
