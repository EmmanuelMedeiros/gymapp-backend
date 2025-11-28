import { Request, Response } from "express";
import { IMuscularGroupService } from "./interface/muscularGroupService.interface";

export class MuscularGroupController {
  muscularGroupService: IMuscularGroupService;
  constructor(muscularGroupService: IMuscularGroupService) {
    this.muscularGroupService = muscularGroupService;
  }

  includeInWeek = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, weekDays } = req.body;
      const { statusCode, ...response } = await this.muscularGroupService.includeInWeek({
        id,
        weekDays
      })
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { statusCode, ...response } =
        await this.muscularGroupService.getAll();
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const { statusCode, ...response } =
        await this.muscularGroupService.deleteById(Number(id));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const { statusCode, ...response } =
        await this.muscularGroupService.getById(Number(id));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
