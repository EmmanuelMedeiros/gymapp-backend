import { Repository } from "typeorm";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { MuscularGroup } from "./entity/muscularGroup.entity";
import { IMuscularGroupService } from "./interface/muscularGroupService.interface";
import { HttpResponse } from "../../utils/httpResponses";

export class MuscularGroupService implements IMuscularGroupService {
  muscularGroupRepository: Repository<MuscularGroup>;

  constructor(muscularGroupRepository: Repository<MuscularGroup>) {
    this.muscularGroupRepository = muscularGroupRepository;
  }

  getById = async (muscularGroupId: number): Promise<ServiceResponse<MuscularGroup>> => {
    const muscularGroup = await this.muscularGroupRepository.findOneBy({
      id: muscularGroupId,
    });
    if (!muscularGroup) {
      throw HttpResponse.badRequest({
        message: "There is no muscular group with given ID",
      });
    }
    return serviceResponse({
      statusCode: 200,
      data: muscularGroup,
    });
  };

  deleteById = async (muscularGroupId: number): Promise<ServiceResponse<MuscularGroup>> => {
    const findMuscularGroup = await this.muscularGroupRepository.findOne({
      where: {
        id: muscularGroupId,
      },
    });
    if (!findMuscularGroup) {
      throw HttpResponse.badRequest({
        message: "Muscular group not found",
      });
    }
    await this.muscularGroupRepository.softRemove(findMuscularGroup);
    return serviceResponse({
      statusCode: 200,
      data: findMuscularGroup
    });
  };

  getAll = async (): Promise<ServiceResponse<MuscularGroup[]>> => {
    const muscularGroups = await this.muscularGroupRepository.find();
    return serviceResponse({
      statusCode: 200,
      data: muscularGroups,
    });
  };
}
