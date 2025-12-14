import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { createMuscularGroupController } from "./muscularGroup.factory";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import userMuscularGroupRequest from "./request/userMuscularGroup.request";

const muscularGroupController = createMuscularGroupController();

const router = Router();

router.post('/user-muscular-group', authMiddleware(), validateRequest(userMuscularGroupRequest.createRequest) , muscularGroupController.createUserMuscularGroup)
router.get('/muscular-group', authMiddleware(), muscularGroupController.getAllMuscularGroups);
router.get('/muscular-group/:id', authMiddleware(), muscularGroupController.getMuscularGroupById);
router.delete('/muscular-group/:id', authMiddleware(), muscularGroupController.deleteMuscularGroupById);

export default router;