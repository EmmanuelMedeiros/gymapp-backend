import { AppDataSource } from "../../database/dbConnection";
import { UserNotificationFrequency } from "./entity/userNotificationFrequency.entity";
import { UserNotificationFrequecyController } from "./userNotificationFrequency.controller";
import { UserNotificationFrequencyService } from "./userNotificationFrequency.service";

export function createUserNotificationFrequencyController() {
  const userNotificationFrequencyServiceRepository = AppDataSource.getRepository(UserNotificationFrequency);
  const userNotificationFrequencyService = new UserNotificationFrequencyService(userNotificationFrequencyServiceRepository, AppDataSource);
  return new UserNotificationFrequecyController(userNotificationFrequencyService);
}