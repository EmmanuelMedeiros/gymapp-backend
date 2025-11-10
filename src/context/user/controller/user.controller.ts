import { Request, Response } from "express";
import { IUserService } from "../interface/userService.interface";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const { statusCode, ...response } = await this.userService.login({
        email,
        password,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password, name } = req.body;
      const { statusCode, ...response } = await this.userService.signUp({
        email,
        name,
        password,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { statusCode, ...response } = await this.userService.getAll();
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
