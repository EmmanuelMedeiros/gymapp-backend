import { AppDataSource } from "../../database/dbConnection";
import { MuscularGroup } from "./entity/muscularGroup.entity";
import { UserMuscularGroup } from "./entity/userMuscularGroup.entity";
import { IMuscularGroupService } from "./interface/muscularGroupService.interface";
import { MuscularGroupController } from "./muscularGroup.controller";
import { MuscularGroupService } from "./muscularGroup.service";
import { UserMuscularGroupService } from "./userMuscularGroup.service";

export function createMuscularGroupController() {
  const muscularGroupService = createMuscularGroupService();
  const userMuscularGroupRepository = createUserMuscularGroupService(muscularGroupService);
  return new MuscularGroupController(muscularGroupService, userMuscularGroupRepository);
}

export function createMuscularGroupService() {
  const muscularGroupRepository = AppDataSource.getRepository(MuscularGroup);
  return new MuscularGroupService(muscularGroupRepository);
}

export function createUserMuscularGroupService(muscularGroupService: IMuscularGroupService) {
  const userMuscularGroupRepository = AppDataSource.getRepository(UserMuscularGroup);
  return new UserMuscularGroupService(userMuscularGroupRepository, muscularGroupService);
}