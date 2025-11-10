import { AppDataSource } from "../../../database/dbConnection";
import { UserController } from "../controller/user.controller";
import { UserService } from '../services/user.service'
import { User } from "../entity/user.entity";
import { Encrypt } from "../../../commons/encrypt/encrypt";

export function createUserController() {
  const encrypt = new Encrypt();
  const userRepository = AppDataSource.getRepository(User);
  const userService = new UserService(userRepository, encrypt);
  return new UserController(userService);
}