import { User } from '../../context/user/entity/user.entity';
import { createUserService } from '../../context/user/user.factory';
import { AppDataSource } from '../../database/dbConnection';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

export function createFirebaseController() {
  const fireBaseService = createFirebaseService();
  return new FirebaseController(fireBaseService);
}

export function createFirebaseService() {
  const userRepository = AppDataSource.getRepository(User);
  const userService = createUserService();
  return new FirebaseService(userService, userRepository);
}
