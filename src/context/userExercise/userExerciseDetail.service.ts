import { Between, DataSource, Relation, Repository } from "typeorm";
import { UserExerciseDetail } from "./entity/userExerciseDetail.entity";
import { IUserExerciseDetailService, MinAndMaxWeights } from "./interface/userExerciseDetailService.interface";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { CreateUserExerciseDetailDTO } from "./dto/createUserExerciseDetail.dto";
import { IUserExerciseService } from "./interface/userExercisesService.interface";
import { UserExercise } from "./entity/userExercise.entity";
import { UpdateWeightDTO } from "./dto/updateWeight.dto";
import { HttpResponse } from "../../utils/httpResponses";
import { DashboardData } from "../../commons/types/dashboardData.type";
import { WeightInPeriodDTO } from "./dto/weightInPeriod.dto";
import dayjs from "dayjs";

export class UserExerciseDetailsService implements IUserExerciseDetailService {
  userExerciseDetailRepository: Repository<UserExerciseDetail>;

  userExerciseService: IUserExerciseService;
  
  dataSource: DataSource;
  
  userExerciseRepository: Repository<UserExercise>;
  constructor(
    userExerciseDetailRepository: Repository<UserExerciseDetail>,
    userExerciseService: IUserExerciseService,
    userExerciseRepository: Repository<UserExercise>,
    dataSource: DataSource,
  ) {
    this.userExerciseDetailRepository = userExerciseDetailRepository;
    this.userExerciseService = userExerciseService;
    this.dataSource = dataSource;
    this.userExerciseRepository = userExerciseRepository
  }

  userWeightByPeriod = async(weightInPeriodDTO: WeightInPeriodDTO): Promise<ServiceResponse<DashboardData[]>> => {
    const dateByPeriod = await this.userExerciseRepository.query(
      `
        select DATE(ued."createdAt") as date, ued.weight as weight
        from "userExercises" ue
        inner join "userExercisesDetails" ued on ued."userExercisesId" = ue.id 
          and Date(ued."createdAt") between $1 and $2
        inner join users u on u.id = ue."userId" and u.id = $3
        where ue.id = $4
        order by ued."createdAt" ASC
      `,
      [
        weightInPeriodDTO.datePeriod.initial,
        weightInPeriodDTO.datePeriod.final,
        weightInPeriodDTO.userId,
        weightInPeriodDTO.exerciseId,
      ]
    );

    const formatedData = dateByPeriod.map(
      (element: { date: Date, weight: number }) => ({
        value: element.weight,
        label: dayjs(element.date).format('YYYY-MM-DD'),
      })
    )

    return serviceResponse({
      statusCode: 200,
      data: formatedData,
    });
  }

  minAndMaxWeightByUser = async(weightInPeriodDTO: WeightInPeriodDTO): Promise<ServiceResponse<MinAndMaxWeights>> => {
    const [minAndMaxWeights] = await this.userExerciseRepository.query(
      `
        select min(ued.weight) as min, max(ued.weight) as max
        from "userExercises" ue
        inner join "userExercisesDetails" ued on ued."userExercisesId" = ue.id 
          and Date(ued."createdAt") between $1 and $2
        inner join users u on u.id = ue."userId" and u.id = $3
        where ue.id = $4
      `,
      [
        weightInPeriodDTO.datePeriod.initial,
        weightInPeriodDTO.datePeriod.final,
        weightInPeriodDTO.userId,
        weightInPeriodDTO.exerciseId,
      ]
    );

    return serviceResponse({
      statusCode: 200,
      data: minAndMaxWeights
    })
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
