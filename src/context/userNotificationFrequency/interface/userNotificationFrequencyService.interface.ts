import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserNotificationFrequencyDTO } from "../dto/createUserNotificationFrequency.dto";
import { UpdateUserNotificationFrequencyDTO } from "../dto/updateUserNotificationFrequency.dto";
import { UserNotificationFrequency } from "../entity/userNotificationFrequency.entity";

export interface IUserNotificationFrequencyService {
  delete: (id: number) => Promise<ServiceResponse<null>>;
  updateByUserId: (updateUserNotificationFrequencyDTO: UpdateUserNotificationFrequencyDTO) => Promise<ServiceResponse<UserNotificationFrequency>>;
  create: (createUserNotificationFrequencyDTO: CreateUserNotificationFrequencyDTO) => Promise<ServiceResponse<UserNotificationFrequency>>;
  getByUserId: (userId: number) => Promise<ServiceResponse<UserNotificationFrequency | null>>;
}