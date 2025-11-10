import { serviceResponse, ServiceResponse } from "../../../utils/serviceResponse";
import { Repository } from "typeorm";
import { verifyValueExistance } from "../../../utils/verifyValueExistance";
import { IUserExercisesService } from "../interface/userExercisesService.interface";
import { UserExercise } from "../entity/userExercises.entity";
import { CreateUserExerciseDTO } from "../dto/createUserExercise.dto";
import { IMuscularGroupsService } from "../interface/muscularGroupsService.interface";

export class UserExercisesService implements IUserExercisesService {
  private userExercisesRepository: Repository<UserExercise>;
  private muscularGroupsService: IMuscularGroupsService;

  constructor(userExercisesRepository: Repository<UserExercise>, muscularGroupsService: IMuscularGroupsService) {
    this.userExercisesRepository = userExercisesRepository;
    this.muscularGroupsService = muscularGroupsService;
  }

  create = async (createUserExerciseDTO: CreateUserExerciseDTO): Promise<ServiceResponse<UserExercise>>  => {
    verifyValueExistance(createUserExerciseDTO);

    try {
      const muscularGroup = await this.muscularGroupsService.findById(createUserExerciseDTO.muscularGroupId);
      
    } catch (err) {
      throw err;
    }

    return Promise.resolve({} as any);
  }
}
