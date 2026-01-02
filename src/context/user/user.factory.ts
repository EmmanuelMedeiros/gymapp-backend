import { AppDataSource } from "../../database/dbConnection";
import { UserController } from "./user.controller";
import { UserService } from './user.service'
import { User } from "./entity/user.entity";
import { Encrypt } from "../../commons/encrypt/encrypt";
import { JWTService } from "../../commons/jwt/jwt";

export function createUserController() {
  const userService = createUserService();
  return new UserController(userService);
}

export function createUserService() {
  const jwtService = new JWTService();
  const encrypt = new Encrypt();
  const userRepository = AppDataSource.getRepository(User);
  return new UserService(userRepository, encrypt, jwtService);
}