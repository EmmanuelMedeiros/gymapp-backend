import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { SignupDTO } from "./dto/signup.dto";
import { IUserService } from "./interface/userService.interface";
import { User } from "./entity/user.entity";
import { User as UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "../../utils/httpResponses";
import { LoginDTO } from "./dto/login.dto";
import { IEncrypt } from "../../commons/encrypt/encrypt.interface";
import { ILike } from "typeorm";
import { IJwtService } from "../../commons/jwt/jwt.interface";

export class UserService implements IUserService {
  private userRepository: Repository<UserEntity>;

  private jwtService: IJwtService;

  private encrypt: IEncrypt;

  constructor(userRepository: Repository<UserEntity>, encrypt: IEncrypt, jwtService: IJwtService) {
    this.userRepository = userRepository;
    this.encrypt = encrypt;
    this.jwtService = jwtService;
  }

  profile = (userId: number): Promise<ServiceResponse<User>> => {
    if (!userId) {
      throw HttpResponse.badRequest({ message: 'No user found!' });
    }

    return Promise.resolve({} as any);
  };

  login = async (loginDTO: LoginDTO): Promise<ServiceResponse<{ user: User, jwt: string }>> => {
    try {
      const { email, password } = loginDTO;
      const user = await this.userRepository.findOne({
        where: {
          email: ILike(email),
        }
      });
      if (!user) {
        throw HttpResponse.badRequest({
          message: 'There is no user with the given credentials'
        });
      }

      const comparePassword = this.encrypt.compare(password, user.password);
      if (!comparePassword) {
        throw HttpResponse.badRequest({ message: "Given credentials doesn't match" });
      }

      const thisUserJwt = this.jwtService.sign(
        {
          id: user.id,
        }
      );

      return serviceResponse(HttpResponse.success({ data: { user, jwt: thisUserJwt }, message: 'User logged in!' }));
    } catch (err) {
      throw err;
    }
  }

  signUp = async (signupDTO: SignupDTO): Promise<ServiceResponse<User>> => {
    try {
      const userWithGivenEmail = await this.userRepository.findOne({
        where: {
          email: signupDTO.email,
        }
      });
      if (userWithGivenEmail) {
        throw HttpResponse.badRequest({ message: 'There is already an user with the given credentials' });
      }

      const hashedPassword = this.encrypt.encrypt(signupDTO.password);
      if (!hashedPassword) {
        throw HttpResponse.badRequest({ message: 'System could not encrypt the given password. Try again later!' })
      }

      await this.userRepository.save({
        email: signupDTO.email,
        name: 'default_name',
        password: hashedPassword,
      });
      return serviceResponse(
        HttpResponse.created({
          data: { ...signupDTO, password: hashedPassword },
          message: "User created successfully",
        })
      );
    } catch (err) {
      throw err;
    }
  };

  getAll = async (): Promise<
    ServiceResponse<
      Pick<User, "id" | "uuid" | "createdAt" | "email" | "name">[]
    >
  > => {
    try {
      this.userRepository.find({
        where: {

        }
      })
      const users = await this.userRepository.find({
        select: ["id", "email", "name", "uuid", "createdAt"],
      });
      return serviceResponse(HttpResponse.success({ data: users }));
    } catch (err) {
      throw err;
    }
  };
}
