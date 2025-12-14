import { Relation, Repository } from 'typeorm';
import { IUserMuscularGroupService } from './interface/userMuscularGroupService.interface';
import { UserMuscularGroup } from './entity/userMuscularGroup.entity';
import { serviceResponse, ServiceResponse } from '../../utils/serviceResponse';
import { CreateUserMuscularGroupDTO } from './dto/createUserMuscularGroup.dto';
import { IMuscularGroupService } from './interface/muscularGroupService.interface';
import { User } from '../user/entity/user.entity';
import { MuscularGroup } from './entity/muscularGroup.entity';

export class UserMuscularGroupService implements IUserMuscularGroupService {
  private userMuscularGroupRepository: Repository<UserMuscularGroup>;
  private muscularGroupService: IMuscularGroupService;
  constructor(
    userMuscularGroupRepository: Repository<UserMuscularGroup>,
    muscularGroupService: IMuscularGroupService,
  ) {
    this.userMuscularGroupRepository = userMuscularGroupRepository;
    this.muscularGroupService = muscularGroupService;
  }

  create = async (createUserMuscularGroupDTO: CreateUserMuscularGroupDTO): Promise<ServiceResponse<UserMuscularGroup>> => {
    this.muscularGroupService.getById(createUserMuscularGroupDTO.muscularGroupId);

    const newUserMuscularGroup = new UserMuscularGroup();

    newUserMuscularGroup.user = { id: createUserMuscularGroupDTO.userId} as Relation<User>;
    newUserMuscularGroup.muscularGroup = { id: createUserMuscularGroupDTO.muscularGroupId } as Relation<MuscularGroup>;
    newUserMuscularGroup.weekDays = createUserMuscularGroupDTO.weekDays;
    
    await this.userMuscularGroupRepository.save(newUserMuscularGroup);

    return serviceResponse({
      statusCode: 201,
      data: newUserMuscularGroup
    })
  };
}
