import { Router } from 'express';
import { authMiddleware } from '../../middleware/authenticate.middleware';
import { validateRequest } from '../../middleware/validateRequest.middleware';
import { createRequest } from './request/create.request';
import { createUserExerciseController } from './userExercise.factory';
import { updateWeight } from './request/updateWeight.request';
import { findById } from './request/findById.request';
import { findUserExerciseByMuscularGroup } from './request/findUserExerciseByMuscularGroup.request';

const userExerciseController = createUserExerciseController();
const router = Router();

router.get('/user-exercise/by/muscular-group/:muscularGroupId', validateRequest(findUserExerciseByMuscularGroup), userExerciseController.findUserExerciseByMuscularGroup);
router.get('/user-exercise/:id', authMiddleware(), validateRequest(findById), userExerciseController.findById)
router.post('/user-exercise', authMiddleware(), validateRequest(createRequest), userExerciseController.create);
router.put('/user-exercise/weight', authMiddleware(), validateRequest(updateWeight), userExerciseController.updateWeight)

export default router;