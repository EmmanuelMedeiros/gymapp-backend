import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreateMuscularGroupDTO } from "../dto/createMuscularGroup.dto";
import { MuscularGroup } from "../entity/muscularGroups.entity";

export interface IMuscularGroupsService {
  create: (createMuscularGroupDTO: CreateMuscularGroupDTO) => Promise<ServiceResponse<MuscularGroup>>; 
  findById: (id: number) => Promise<ServiceResponse<MuscularGroup>>
}