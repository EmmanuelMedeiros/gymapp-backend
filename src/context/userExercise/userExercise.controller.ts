import { Request, Response } from 'express';
import { IUserExerciseService } from './interface/userExercisesService.interface';
import { IUserExerciseDetailService } from './interface/userExerciseDetailService.interface';

export class UserExericeController {
  private userExerciseService: IUserExerciseService;

  private userExerciseDetailService: IUserExerciseDetailService;

  constructor(
    userExerciseService: IUserExerciseService,
    userExerciseDetailService: IUserExerciseDetailService,
  ) {
    this.userExerciseService = userExerciseService;
    this.userExerciseDetailService = userExerciseDetailService;
  }

  userWeightByPeriod = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { datePeriod, exerciseId } = req.body;
      const { statusCode, ...response } =
        await this.userExerciseDetailService.userWeightByPeriod({
          datePeriod,
          exerciseId,
          userId,
        });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  minAndMaxWeightByUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { datePeriod, exerciseId } = req.body;
      const { statusCode, ...response } =
        await this.userExerciseDetailService.minAndMaxWeightByUser({
          datePeriod,
          exerciseId,
          userId,
        });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const { statusCode, ...response } = await this.userExerciseService.deleteById(Number(id));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  findExercisesByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user.id;
      const { statusCode, ...response } = await this.userExerciseService.findExercisesByUserId(
        userId,
      );
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  findUserExerciseByMuscularGroup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { muscularGroupId } = req.params;
      const { statusCode, ...response } =
        await this.userExerciseService.findUserExerciseByMuscularGroup({
          muscularGroupId: Number(muscularGroupId),
        });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { statusCode, ...response } = await this.userExerciseService.findById(Number(id));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { muscularGroupId, title, weight } = req.body;
      const user = req.user;
      const { statusCode, ...response } = await this.userExerciseService.create({
        muscularGroupId,
        title,
        userId: user.id,
        weight,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      console.log(err);
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  updateWeight = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { weight, userExerciseId } = req.body;
      const { statusCode, ...response } = await this.userExerciseDetailService.updateWeight({
        weight,
        userExerciseId,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
