import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserExerciseDTO } from "../dto/createUserExercise.dto";
import { FindUserExerciseByMuscularGroupDTO } from "../dto/findUserExerciseByMuscularGroup.dto";
import { UserExercise } from "../entity/userExercise.entity";
import { UserExerciseDetail } from "../entity/userExerciseDetail.entity";

export interface IUserExerciseService {
  findById: (id: number) => Promise<ServiceResponse<UserExercise>>;
  findUserExerciseByTitle: (userExerciseName: string, muscularGroupId: number) => Promise<UserExercise | null>;
  findUserExerciseByMuscularGroup: (findUserExerciseByMuscularGroupDTO: FindUserExerciseByMuscularGroupDTO) => Promise<ServiceResponse<UserExercise[]>>;
  findCurrentUserExerciseDetails: (userExerciseId: number) => Promise<UserExerciseDetail | null>;
  findExercisesByUserId: (userId: number) => Promise<ServiceResponse<UserExercise[]>>;
  deleteById: (id: number) => Promise<ServiceResponse<null>>;
  create: (createUserExerciseDTO: CreateUserExerciseDTO) => Promise<ServiceResponse<UserExercise>>;
}