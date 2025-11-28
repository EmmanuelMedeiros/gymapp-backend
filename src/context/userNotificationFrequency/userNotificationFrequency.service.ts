import { DataSource, Relation, Repository } from "typeorm";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { CreateUserNotificationFrequencyDTO } from "./dto/createUserNotificationFrequency.dto";
import { UserNotificationFrequency } from "./entity/userNotificationFrequency.entity";
import { UpdateUserNotificationFrequencyDTO } from "./dto/updateUserNotificationFrequency.dto";
import { HttpResponse } from "../../utils/httpResponses";
import { IUserNotificationFrequencyService } from "./interface/userNotificationFrequencyService.interface";
import { User } from "../user/entity/user.entity";

export class UserNotificationFrequencyService implements IUserNotificationFrequencyService {
  userNotificationFrequencyRepository: Repository<UserNotificationFrequency>;

  dataSource: DataSource;

  constructor(
    userNotificationFrequencyRepository: Repository<UserNotificationFrequency>,
    dataSource: DataSource
  ) {
    this.userNotificationFrequencyRepository =
      userNotificationFrequencyRepository;
    this.dataSource = dataSource;
  }

  getByUserId = async (userId: number): Promise<ServiceResponse<UserNotificationFrequency>> => {
    const userNotificationFrequency = await this.userNotificationFrequencyRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!userNotificationFrequency) {
      throw HttpResponse.badRequest({
        message: 'There is no frequency for this user',
      });
    }
    return serviceResponse({
      statusCode: 200,
      data: userNotificationFrequency,
    });
  }

  async update(
    updateUserNotificationFrequencyDTO: UpdateUserNotificationFrequencyDTO
  ): Promise<ServiceResponse<UserNotificationFrequency>> {
    const userNotificationToUpdate =
      await this.userNotificationFrequencyRepository.findOne({
        where: {
          id: updateUserNotificationFrequencyDTO.id,
        },
      });

    if (!userNotificationToUpdate) {
      throw HttpResponse.badRequest({
        message: "No workout frequency was found for this user",
      });
    }

    const { id, ...updateObj } = updateUserNotificationFrequencyDTO;
    await this.userNotificationFrequencyRepository.update(
      userNotificationToUpdate,
      {
        ...updateObj,
      }
    );

    return serviceResponse({
      statusCode: 200,
      data: userNotificationToUpdate,
    });
  }

  async create(
    createUserNotificationFrequency: CreateUserNotificationFrequencyDTO
  ): Promise<ServiceResponse<UserNotificationFrequency>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const previousUserNotificationFrequency =
        await queryRunner.manager.findOne(UserNotificationFrequency, {
          where: {
            user: {
              id: createUserNotificationFrequency.userId,
            },
          },
        });
      if (previousUserNotificationFrequency) {
        await queryRunner.manager.remove(
          UserNotificationFrequency,
          previousUserNotificationFrequency
        );
      }

      const frequencyToCreate = new UserNotificationFrequency();
      frequencyToCreate.hour = createUserNotificationFrequency.hour;
      frequencyToCreate.user = { id: createUserNotificationFrequency.userId } as Relation<User>;
      frequencyToCreate.weekDays = createUserNotificationFrequency.weekDays;

      const createdFrequency = await queryRunner.manager.save(
        UserNotificationFrequency,
        frequencyToCreate
      );

      await queryRunner.commitTransaction();
      return serviceResponse({
        statusCode: 201,
        data: createdFrequency,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
