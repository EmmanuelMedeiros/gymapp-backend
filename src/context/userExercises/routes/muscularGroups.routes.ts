import { Router } from "express";
import { createMuscularGroupsController } from "../factory/muscularGroups.factory";

const muscularGroupsController = createMuscularGroupsController();

const router = Router();

router.post("/muscular-group", muscularGroupsController.create);

export default router;
