import { AppDataSource } from "../../database/dbConnection";
import { UserController } from "./user.controller";
import { UserService } from './user.service'
import { User } from "./entity/user.entity";
import { Encrypt } from "../../commons/encrypt/encrypt";
import { JWTService } from "../../commons/jwt/jwt";

export function createUserController() {
  const jwtService = new JWTService();
  const encrypt = new Encrypt();
  const userRepository = AppDataSource.getRepository(User);
  const userService = new UserService(userRepository, encrypt, jwtService);
  return new UserController(userService);
}