import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserMuscularGroupDTO } from "../dto/createUserMuscularGroup.dto";
import { UserMuscularGroup } from "../entity/userMuscularGroup.entity";

export interface IUserMuscularGroupService {
  create: (createUserMuscularGroupDTO: CreateUserMuscularGroupDTO) => Promise<ServiceResponse<UserMuscularGroup>>;
}