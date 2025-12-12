import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { createMuscularGroupController } from "./muscularGroup.factory";

const muscularGroupController = createMuscularGroupController();

const router = Router();

router.get('/muscular-group', authMiddleware(), muscularGroupController.getAll);
router.get('/muscular-group/:id', authMiddleware(), muscularGroupController.getById);
router.delete('/muscular-group/:id', authMiddleware(), muscularGroupController.deleteById);

export default router;