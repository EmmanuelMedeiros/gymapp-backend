import { serviceResponse, ServiceResponse } from '../../utils/serviceResponse';
import { SendNotificationToUserDTO } from './dto/sendNotificationToUser.dto';
import { IFirebaseService, SendNotificationResults } from './interface/firebaseService.interface';
import { RegisterTokenDTO } from './dto/registerToken.dto';
import { IUserService } from '../../context/user/interface/userService.interface';
import firebaseCredentialFile from '../../firebaseServiceAccount.json';
import admin from 'firebase-admin';
import { Repository } from 'typeorm';
import { User } from '../../context/user/entity/user.entity';
import { HttpResponse } from '../../utils/httpResponses';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentialFile as any),
});

export class FirebaseService implements IFirebaseService {
  private userService: IUserService;
  private userRepository: Repository<User>;
  constructor(userService: IUserService, userRepository: Repository<User>) {
    this.userService = userService;
    this.userRepository = userRepository;
  }

  registerToken = async (registerTokenDTO: RegisterTokenDTO): Promise<ServiceResponse<null>> => {
    await this.userService.update({
      id: registerTokenDTO.userId,
      deviceToken: registerTokenDTO.deviceToken,
    });
    return serviceResponse({
      statusCode: 200,
      data: null,
      message: 'Token binded successfully',
    });
  };

  sendNotificationToUser = async (
    sendNotificationToUserDTO: SendNotificationToUserDTO,
  ): Promise<ServiceResponse<SendNotificationResults>> => {
    const user = await this.userRepository.findOne({
      where: {
        deviceToken: sendNotificationToUserDTO.deviceToken,
      },
    });
    if (!user) {
      return null as any
    }

    const messagingResponse = await firebaseAdmin.messaging().sendEachForMulticast({
      notification: {
        title: sendNotificationToUserDTO.title,
        body: sendNotificationToUserDTO.description,
      },
      tokens: [sendNotificationToUserDTO.deviceToken],
    });

    return serviceResponse({
      statusCode: 200,
      data: {
        success: true,
        devicesSent: messagingResponse.successCount,
        devicesFailed: messagingResponse.failureCount,
      }
    });
  };
}
