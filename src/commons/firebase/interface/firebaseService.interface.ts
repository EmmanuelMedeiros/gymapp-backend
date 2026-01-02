import { ServiceResponse } from '../../../utils/serviceResponse';
import { RegisterTokenDTO } from '../dto/registerToken.dto';
import { SendNotificationToUserDTO } from '../dto/sendNotificationToUser.dto';

export type SendNotificationResults = {
  success: boolean;
  devicesSent: number; 
  devicesFailed: number;
}

export interface IFirebaseService {
  registerToken: (registerTokenDTO: RegisterTokenDTO) => Promise<ServiceResponse<null>>;
  sendNotificationToUser: (sendNotificationToUserDTO: SendNotificationToUserDTO) => Promise<ServiceResponse<SendNotificationResults>>;
}
