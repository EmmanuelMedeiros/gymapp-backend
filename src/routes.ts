import { Router } from "express";
import userRouter from './context/user/user.routes';
import userNotificationFrequencyRouter from './context/userNotificationFrequency/userNotificationFrequency.routes'
import muscularGroupRouter from './context/muscularGroup/muscularGroup.routes';
import userExerciseRouter from './context/userExercise/userExercise.routes';
import firebaseRouter from './commons/firebase/firebase.routes';

const router = Router();

router.use(userRouter);
router.use(userNotificationFrequencyRouter);
router.use(muscularGroupRouter);
router.use(userExerciseRouter);
router.use(firebaseRouter);

export default router;