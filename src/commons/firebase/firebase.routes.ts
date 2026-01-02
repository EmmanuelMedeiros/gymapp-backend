import { Router } from "express";
import { createFirebaseController } from "./firebase.factory";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import firebaseRequest from "./firebase.request";
import { authMiddleware } from "../../middleware/authenticate.middleware";

const firebaseController = createFirebaseController();
const router = Router();

router.put('/firebase/register-token', authMiddleware(), validateRequest(firebaseRequest.registerTokenRequest), firebaseController.registerToken);
router.post('/firebase/send-to-user', validateRequest(firebaseRequest.sendNotificationToUserRequest), firebaseController.sendNotificationToUser);

export default router;