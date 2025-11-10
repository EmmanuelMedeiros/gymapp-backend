import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateUserExerciseDTO } from "../dto/createUserExercise.dto";
import { UserExercise } from "../entity/userExercises.entity";

export interface IUserExercisesService {
  create: (createUserExerciseDTO: CreateUserExerciseDTO) => Promise<ServiceResponse<UserExercise>>;
}