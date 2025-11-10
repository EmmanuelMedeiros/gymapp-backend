import { Router } from "express";
import { createUserController } from "../factory/user.factory";

const userController = createUserController();

const router = Router();

router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.get('/user', userController.getAll);

export default router;