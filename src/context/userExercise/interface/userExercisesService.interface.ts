import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserExerciseDTO } from "../dto/createUserExercise.dto";
import { FindUserExerciseByMuscularGroupDTO } from "../dto/findUserExerciseByMuscularGroup.dto";
import { UserExercise } from "../entity/userExercise.entity";
import { UserExerciseDetail } from "../entity/userExerciseDetail.entity";

export interface IUserExerciseService {
  findById: (id: number) => Promise<ServiceResponse<UserExercise>>;
  findUserExerciseByTitle: (userExerciseName: string) => Promise<UserExercise | null>;
  findUserExerciseByMuscularGroup: (findUserExerciseByMuscularGroupDTO: FindUserExerciseByMuscularGroupDTO) => Promise<ServiceResponse<UserExercise[]>>;
  create: (createUserExerciseDTO: CreateUserExerciseDTO) => Promise<ServiceResponse<UserExercise>>;
  findCurrentUserExerciseDetails: (userExerciseId: number) => Promise<UserExerciseDetail | null>;
}