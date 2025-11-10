import { Router } from "express";
import userRouter from './context/user/routes/user.routes';
import muscularGroupsRouter from './context/muscularGroups/routes/muscularGroups.routes'

const router = Router();

router.use(userRouter);
router.use(muscularGroupsRouter);

export default router;