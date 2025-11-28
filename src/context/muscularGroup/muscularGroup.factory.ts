import { AppDataSource } from "../../database/dbConnection";
import { MuscularGroup } from "./entity/muscularGroup.entity";
import { MuscularGroupController } from "./muscularGroup.controller";
import { MuscularGroupService } from "./muscularGroup.service";

export function createMuscularGroupController() {
  const muscularGroupService = createMuscularGroupService();
  return new MuscularGroupController(muscularGroupService);
}

export function createMuscularGroupService() {
  const muscularGroupRepository = AppDataSource.getRepository(MuscularGroup);
  return new MuscularGroupService(muscularGroupRepository);
}