import { ServiceResponse } from "../../../utils/serviceResponse";
import { IncludeInWeekDTO } from "../dto/includeInWeek.dto";
import { MuscularGroup } from "../entity/muscularGroup.entity";

export interface IMuscularGroupService {
  getById: (muscularGroupId: number) => Promise<ServiceResponse<MuscularGroup>>;
  getAll: () => Promise<ServiceResponse<MuscularGroup[]>>;
  deleteById: (muscularGroupId: number) => Promise<ServiceResponse<MuscularGroup>>;
  includeInWeek: (includeInWeek: IncludeInWeekDTO) => Promise<ServiceResponse<undefined>>;
}
