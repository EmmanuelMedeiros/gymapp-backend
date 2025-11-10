import { Repository } from "typeorm";
import {
  serviceResponse,
  ServiceResponse,
} from "../../../utils/serviceResponse";
import { CreateMuscularGroupDTO } from "../dto/createMuscularGroup.dto";
import { MuscularGroup } from "../entity/muscularGroups.entity";
import { IMuscularGroupsService } from "../interface/muscularGroupsService.interface";
import { verifyValueExistance } from "../../../utils/verifyValueExistance";
import { HttpResponse } from "../../../utils/httpResponses";

export class MuscularGroupsService implements IMuscularGroupsService {
  private muscularGroupsRepository: Repository<MuscularGroup>;
  constructor(muscularGroupsRepository: Repository<MuscularGroup>) {
    this.muscularGroupsRepository = muscularGroupsRepository;
  }

  create = async (
    createMuscularGroupDTO: CreateMuscularGroupDTO
  ): Promise<ServiceResponse<MuscularGroup>> => {
    verifyValueExistance(createMuscularGroupDTO);

    const { title } = createMuscularGroupDTO;

    const sameNameMuscularGroup = await this.muscularGroupsRepository.findOne({
      where: {
        title,
      },
    });
    if (sameNameMuscularGroup) {
      throw HttpResponse.badRequest({
        message: "There is already a muscular group created with this title",
      });
    }

    const newMuscularGroup = await this.muscularGroupsRepository.save({
      title,
    });
    return serviceResponse(
      HttpResponse.created({
        data: newMuscularGroup,
        message: "New muscular group created!",
      })
    );
  };

  findById = async (id: number) : Promise<ServiceResponse<MuscularGroup>> => {
    if (!id) {
      throw HttpResponse.badRequest({ message: "It is necessary to pass ID to find muscular group by ID" });
    }
    const muscularGroup = this.muscularGroupsRepository.findOne({
      where: {
        id,
      },
    });
    if (!muscularGroup) {
      throw HttpResponse.badRequest({ message: "No muscular group found with given ID!" });
    }
    return serviceResponse(HttpResponse.success({
      data: muscularGroup
    }));
  }
}
