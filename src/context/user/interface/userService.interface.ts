import { ServiceResponse } from "../../../utils/serviceResponse";
import { LoginDTO } from "../dto/login.dto";
import { SignupDTO } from "../dto/signup.dto";
import { UpdateUserDTO } from "../dto/update.dto";
import { User } from "../entity/user.entity";

export interface IUserService {
  findById: (id: number) => Promise<ServiceResponse<User>>;
  signUp: (signupDTO: SignupDTO) => Promise<ServiceResponse<User>>;
  getAll: () => Promise<ServiceResponse<Pick<User, 'id' | 'uuid' | 'createdAt' | 'email' | 'name'>[]>>;
  login: (loginDTO: LoginDTO) => Promise<ServiceResponse<{ user: User, jwt: string }>>;
  profile: (userId: number) => Promise<ServiceResponse<User>>; 
  update: (updateDTO: UpdateUserDTO) => Promise<ServiceResponse<User>>;
}