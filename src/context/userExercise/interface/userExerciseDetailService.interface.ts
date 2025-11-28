import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserExerciseDetailDTO } from "../dto/createUserExerciseDetail.dto";
import { UpdateWeightDTO } from "../dto/updateWeight.dto";
import { UserExerciseDetail } from "../entity/userExerciseDetail.entity";

export interface IUserExerciseDetailService {
  create: (createUserExerciseDetailDTO: CreateUserExerciseDetailDTO) => Promise<ServiceResponse<UserExerciseDetail>>;
  updateWeight: (updateWeightDTO: UpdateWeightDTO) => Promise<ServiceResponse<UserExerciseDetail>>;
}