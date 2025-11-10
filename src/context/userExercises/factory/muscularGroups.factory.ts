import { MuscularGroupsController } from "../controller/muscularGroups.controller";
import { AppDataSource } from "../../../database/dbConnection";
import { MuscularGroupsService } from "../services/muscularGroups.service";
import { MuscularGroup } from "../entity/muscularGroups.entity";

export function createMuscularGroupsController() {
  const muscularGroupsService = createMuscularGroupsService();
  return new MuscularGroupsController(muscularGroupsService);
}

export function createMuscularGroupsService() {
  const muscularGroupsRepository = AppDataSource.getRepository(MuscularGroup);
  return new MuscularGroupsService(muscularGroupsRepository);
}
