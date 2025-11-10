import { ServiceResponse } from "../../../utils/serviceResponse";
import { LoginDTO } from "../dto/login.dto";
import { SignupDTO } from "../dto/signup.dto";
import { User } from "../entity/user.entity";

export interface IUserService {
  signUp: (signupDTO: SignupDTO) => Promise<ServiceResponse<User>>;
  getAll: () => Promise<ServiceResponse<Pick<User, 'id' | 'uuid' | 'createdAt' | 'email' | 'name'>[]>>;
  login: (loginDTO: LoginDTO) => Promise<ServiceResponse<User>>;
  profile: (userId: number) => Promise<ServiceResponse<User>>; 
}