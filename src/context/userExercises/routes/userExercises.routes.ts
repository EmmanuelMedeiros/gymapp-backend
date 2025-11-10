import { Router } from "express";
import { createUserExercisesController } from "../factory/userExercises.factory";

const userExercisesController = createUserExercisesController();

const router = Router();

router.post('/user-exercises/create', userExercisesController.create);

export default router;