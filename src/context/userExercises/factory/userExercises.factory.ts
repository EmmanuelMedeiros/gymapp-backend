import { AppDataSource } from "../../../database/dbConnection";
import { Encrypt } from "../../../commons/encrypt/encrypt";
import { UserExercise } from "../entity/userExercises.entity";
import { UserExercisesService } from "../services/userExercises.service";
import { UserExercisesController } from "../controller/userExercises.controller";
import { createMuscularGroupsService } from "./muscularGroups.factory";

export function createUserExercisesController() {
  const userExercisesRepository = AppDataSource.getRepository(UserExercise);
  const muscularGroupService = createMuscularGroupsService();
  const userExercisesService = new UserExercisesService(userExercisesRepository, muscularGroupService);
  return new UserExercisesController(userExercisesService);
}