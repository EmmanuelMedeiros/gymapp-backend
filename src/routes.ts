import { Router } from "express";
import userRouter from './context/user/user.routes';
import userNotificationFrequencyRouter from './context/userNotificationFrequency/userNotificationFrequency.routes'
import muscularGroupRouter from './context/muscularGroup/muscularGroup.routes';
import userExercise from './context/userExercise/userExercise.routes';

const router = Router();

router.use(userRouter);
router.use(userNotificationFrequencyRouter);
router.use(muscularGroupRouter);
router.use(userExercise);

export default router;