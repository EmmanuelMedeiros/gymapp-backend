import { Request, Response } from "express";

import { IMuscularGroupsService } from "../interface/muscularGroupsService.interface";

export class MuscularGroupsController {
  private muscularGroupsService: IMuscularGroupsService;
  constructor(muscularGroupsService: IMuscularGroupsService) {
    this.muscularGroupsService = muscularGroupsService;
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title } = req.body;
      const { statusCode, ...response } = await this.muscularGroupsService.create({
        title,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
