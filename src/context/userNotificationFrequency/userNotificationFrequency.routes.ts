import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createUserNotificationFrequencyController } from "./userNotificationFrequency.factory";
import UserNotificationFrequencyRequest from "./request/userNotificationFrequency.request"

const userNotificationFrequencyControler = createUserNotificationFrequencyController();
const userNotificationFrequencyRequest = UserNotificationFrequencyRequest;

const router = Router();

router.delete(
  "/user-notification-frequency/:id",
  authMiddleware(),
  validateRequest(userNotificationFrequencyRequest.delete),
  userNotificationFrequencyControler.delete,
)

router.patch(
  "/user-notification-frequency",
  authMiddleware(),
  userNotificationFrequencyControler.updateByUserId
)

router.post(
  "/user-notification-frequency",
  authMiddleware(),
  validateRequest(userNotificationFrequencyRequest.create),
  userNotificationFrequencyControler.create
);

router.get(
  "/user-notification-frequency",
  authMiddleware(),
  userNotificationFrequencyControler.getByUserId,
)

export default router;
