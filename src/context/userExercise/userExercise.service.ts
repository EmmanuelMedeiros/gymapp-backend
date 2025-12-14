import { DataSource, ILike, Not, Raw, Relation, Repository } from "typeorm";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { IMuscularGroupService } from "../muscularGroup/interface/muscularGroupService.interface";
import { CreateUserExerciseDTO } from "./dto/createUserExercise.dto";
import { UserExercise } from "./entity/userExercise.entity";
import { IUserExerciseService } from "./interface/userExercisesService.interface";
import { HttpResponse } from "../../utils/httpResponses";
import { MuscularGroup } from "../muscularGroup/entity/muscularGroup.entity";
import { User } from "../user/entity/user.entity";
import { UserExerciseDetail } from "./entity/userExerciseDetail.entity";
import { FindUserExerciseByMuscularGroupDTO } from "./dto/findUserExerciseByMuscularGroup.dto";

export class UserExerciseService implements IUserExerciseService {
  muscularGroupService: IMuscularGroupService;

  userExerciseRepository: Repository<UserExercise>;

  dataSource: DataSource;

  constructor(
    muscularGroupService: IMuscularGroupService,
    userExerciseRepository: Repository<UserExercise>,
    dataSource: DataSource,
  ) {
    this.muscularGroupService = muscularGroupService;
    this.userExerciseRepository = userExerciseRepository;
    this.dataSource = dataSource;
  }

  findExercisesByUserId = async (userId: number): Promise<ServiceResponse<UserExercise[]>> => {
    const userExercises = await this.userExerciseRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        muscularGroup: true,
      },
    });

    return serviceResponse({
      data: userExercises,
      statusCode: 200,
      message: userExercises.length < 1 ? 'There is not any registered exercise.' : '',
    });
  }

  findUserExerciseByMuscularGroup = async (findUserExerciseByMuscularGroupDTO: FindUserExerciseByMuscularGroupDTO): Promise<ServiceResponse<UserExercise[]>> => {
    const muscularGroup = await this.muscularGroupService.getById(findUserExerciseByMuscularGroupDTO.muscularGroupId);

    const userExercise = await this.userExerciseRepository.find(
      {
        relations: {
          userExerciseDetails: true,
          muscularGroup: true,
        },
        where: {
          muscularGroup: {
            id: muscularGroup.data.id
          },
          userExerciseDetails: {
            didWeightChange: Raw(alias => `${alias} IS NOT true`)
          }
        }
      }
    );
    return serviceResponse({
      statusCode: 200,
      data: userExercise
    })
  };

  findUserExerciseByTitle = async (userExerciseName: string): Promise<UserExercise | null> => {
    const userExerciseRepositoryResponse = await this.userExerciseRepository.findOne({
      where: {
        title: ILike(`%${userExerciseName}%`),
      },
    });
    return userExerciseRepositoryResponse;
  }

  findCurrentUserExerciseDetails = async (userExerciseId: number): Promise<UserExerciseDetail | null> => {
    const userExercise = await this.userExerciseRepository.findOne({
      relations: {
        userExerciseDetails: true,
      },
      where: {
        id: userExerciseId,
        userExerciseDetails: {
          didWeightChange: Raw(alias => `${alias} IS NOT true`),
        }
      }
    });

    if (!userExercise) {
      return null;
    }
    return userExercise.userExerciseDetails[0];
  }


  create = async (createUserExerciseDTO: CreateUserExerciseDTO): Promise<ServiceResponse<UserExercise>> => {
    const { data: muscularGroup } = await this.muscularGroupService.getById(createUserExerciseDTO.muscularGroupId);

    const userExerciseWithSameTitle = await this.findUserExerciseByTitle(createUserExerciseDTO.title); 
    if (userExerciseWithSameTitle) {
      throw HttpResponse.badRequest({
        message: `There is already an user exercise called '${createUserExerciseDTO.title}'`,
      });
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userExercise = new UserExercise();
      userExercise.muscularGroup = { id: muscularGroup?.id } as Relation<MuscularGroup>;
      userExercise.title = createUserExerciseDTO.title;
      userExercise.user = { id: createUserExerciseDTO.userId } as Relation<User>;
      const userExerciseRepositoryResponse = await queryRunner.manager.save(UserExercise, userExercise);

      const userExerciseDetails = new UserExerciseDetail();
      userExerciseDetails.userExercise = { id: userExerciseRepositoryResponse.id } as Relation<UserExercise>;
      userExerciseDetails.weight = createUserExerciseDTO.weight;
      await queryRunner.manager.save(UserExerciseDetail, userExerciseDetails);

      await queryRunner.commitTransaction();
      return serviceResponse({
        statusCode: 201,
        data: userExerciseRepositoryResponse,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

  };

  findById = async (id: number): Promise<ServiceResponse<UserExercise>> => {
    const userExercise = await this.userExerciseRepository.findOne({
      relations: {
        userExerciseDetails: true,
      },
      where: {
        id,
        userExerciseDetails: {
          didWeightChange: Raw(alias => `${alias} IS NOT true`)
        }
      },
    });
    if (!userExercise) {
      throw HttpResponse.badRequest({
        message: "There is no userExercise with given ID",
      });
    }
    return serviceResponse({
      statusCode: 200,
      data: userExercise,
    });
  };
}
