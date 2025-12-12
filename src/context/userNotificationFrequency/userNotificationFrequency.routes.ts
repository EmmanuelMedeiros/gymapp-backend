import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createUserNotificationFrequencyController } from "./userNotificationFrequency.factory";
import { createRequest } from "./request/create.request";

const userNotificationFrequencyControler =
  createUserNotificationFrequencyController();

const router = Router();

router.patch(
  "/user-notification-frequency",
  authMiddleware(),
  userNotificationFrequencyControler.updateByUserId
)

router.post(
  "/user-notification-frequency",
  authMiddleware(),
  validateRequest(createRequest),
  userNotificationFrequencyControler.create
);

router.get(
  "/user-notification-frequency",
  authMiddleware(),
  userNotificationFrequencyControler.getByUserId,
)

export default router;
