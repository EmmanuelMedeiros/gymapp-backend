import { AppDataSource } from "../../database/dbConnection";
import { createMuscularGroupService } from "../muscularGroup/muscularGroup.factory";
import { UserExercise } from "./entity/userExercise.entity";
import { UserExerciseDetail } from "./entity/userExerciseDetail.entity";
import { UserExericeController } from "./userExercise.controller";
import { UserExerciseService } from "./userExercise.service";
import { UserExerciseDetailsService } from "./userExerciseDetail.service";

export function createUserExerciseController() {
  const userExerciseRepository = AppDataSource.getRepository(UserExercise);
  const userExerciseDetailRepository = AppDataSource.getRepository(UserExerciseDetail);
  const muscularGroupService = createMuscularGroupService();
  const userExerciseService = new UserExerciseService(muscularGroupService, userExerciseRepository, AppDataSource);
  const userExerciseDetailService = new UserExerciseDetailsService(userExerciseDetailRepository, userExerciseService, AppDataSource);
  return new UserExericeController(userExerciseService, userExerciseDetailService);
}
