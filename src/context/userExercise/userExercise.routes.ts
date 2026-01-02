import { Router } from 'express';
import { authMiddleware } from '../../middleware/authenticate.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { createUserExerciseController } from './userExercise.factory';
import userExerciseRequest from './request/userExercise.request';
import userExerciseDetailsRequest from './request/userExerciseDetails.request';

const userExerciseController = createUserExerciseController();
const router = Router();

router.post('/user-exercise/details/weight-by-period', authMiddleware(), validateRequest(userExerciseDetailsRequest.minAndMaxWeightByUser), userExerciseController.userWeightByPeriod)
router.post('/user-exercise/details/min-and-max-weight', authMiddleware(), validateRequest(userExerciseDetailsRequest.minAndMaxWeightByUser), userExerciseController.minAndMaxWeightByUser);
router.get('/user-exercise/by/user', authMiddleware(), userExerciseController.findExercisesByUserId);
router.get('/user-exercise/by/muscular-group/:muscularGroupId', validateRequest(userExerciseRequest.findUserExerciseByMuscularGroup), userExerciseController.findUserExerciseByMuscularGroup);
router.get('/user-exercise/:id', authMiddleware(), validateRequest(userExerciseRequest.findById), userExerciseController.findById);
router.post('/user-exercise', authMiddleware(), validateRequest(userExerciseRequest.createRequest), userExerciseController.create);
router.put('/user-exercise/weight', authMiddleware(), validateRequest(userExerciseDetailsRequest.updateWeight), userExerciseController.updateWeight);
router.delete('/user-exercise/:id', authMiddleware(), userExerciseController.deleteById);

export default router;