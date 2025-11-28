import { DataSource, Relation, Repository } from "typeorm";
import { UserExerciseDetail } from "./entity/userExerciseDetail.entity";
import { IUserExerciseDetailService } from "./interface/userExerciseDetailService.interface";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { CreateUserExerciseDetailDTO } from "./dto/createUserExerciseDetail.dto";
import { IUserExerciseService } from "./interface/userExercisesService.interface";
import { UserExercise } from "./entity/userExercise.entity";
import { UpdateWeightDTO } from "./dto/updateWeight.dto";
import { HttpResponse } from "../../utils/httpResponses";

export class UserExerciseDetailsService implements IUserExerciseDetailService {
  userExerciseDetailRepository: Repository<UserExerciseDetail>;

  userExerciseService: IUserExerciseService;

  dataSource: DataSource;
  
  constructor(
    userExerciseDetail: Repository<UserExerciseDetail>,
    userExerciseService: IUserExerciseService,
    dataSource: DataSource,
  ) {
    this.userExerciseDetailRepository = userExerciseDetail;
    this.userExerciseService = userExerciseService;
    this.dataSource = dataSource;
  }

  updateWeight = async (updateWeightDTO: UpdateWeightDTO): Promise<ServiceResponse<UserExerciseDetail>> => {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    const currentUserExerciseDetail = await this.userExerciseService.findCurrentUserExerciseDetails(updateWeightDTO.userExerciseId);

    if (!currentUserExerciseDetail) {
      throw HttpResponse.badRequest({
        message: 'This user exercise does not exist. Update denied'
      });
    }
    if (currentUserExerciseDetail.weight === updateWeightDTO.weight) {
      throw HttpResponse.badRequest({
        message: 'The new weight is the same of current one'
      })
    }

    try {
      await queryRunner.manager.update(UserExerciseDetail, 
        {
          id: currentUserExerciseDetail.id,
        },
        {
          didWeightChange: true,
        }
      );

      const updatedUserExerciseDetails = new UserExerciseDetail();
      updatedUserExerciseDetails.userExercise = { id: updateWeightDTO.userExerciseId } as Relation<UserExercise>;
      updatedUserExerciseDetails.weight = updateWeightDTO.weight;
      const userExerciseDetail = await queryRunner.manager.save(UserExerciseDetail, updatedUserExerciseDetails);

      await queryRunner.commitTransaction();
      return serviceResponse({
        statusCode: 200,
        data: userExerciseDetail,
      })
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  };

  create = async (createUserExerciseDetailDTO: CreateUserExerciseDetailDTO): Promise<ServiceResponse<UserExerciseDetail>> => {
    const { data: userExercise } = await this.userExerciseService.findById(createUserExerciseDetailDTO.userExerciseId);

    const userExerciseDetail = new UserExerciseDetail();
    userExerciseDetail.weight = createUserExerciseDetailDTO.weight;
    userExerciseDetail.userExercise = { id: userExercise?.id } as Relation<UserExercise>;

    const userExerciseDetailRepositoryResponse = await this.userExerciseDetailRepository.save(userExerciseDetail);
    return serviceResponse({
      statusCode: 201,
      data: userExerciseDetailRepositoryResponse
    })
  };
}
