import { DashboardData } from "../../../commons/types/dashboardData.type";
import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserExerciseDetailDTO } from "../dto/createUserExerciseDetail.dto";
import { UpdateWeightDTO } from "../dto/updateWeight.dto";
import { WeightInPeriodDTO } from "../dto/weightInPeriod.dto";
import { UserExerciseDetail } from "../entity/userExerciseDetail.entity";

export type MinAndMaxWeights = {
  min: number;
  max: number;
}

export interface IUserExerciseDetailService {
  create: (createUserExerciseDetailDTO: CreateUserExerciseDetailDTO) => Promise<ServiceResponse<UserExerciseDetail>>;
  updateWeight: (updateWeightDTO: UpdateWeightDTO) => Promise<ServiceResponse<UserExerciseDetail>>;
  minAndMaxWeightByUser: (weightInPeriodDTO: WeightInPeriodDTO) => Promise<ServiceResponse<MinAndMaxWeights>>; 
  userWeightByPeriod: (weightInPeriodDTO: WeightInPeriodDTO) => Promise<ServiceResponse<DashboardData[]>>; 
}