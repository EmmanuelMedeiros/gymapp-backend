import { Router } from "express";
import { createUserController } from "./user.factory";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { loginRequest } from "./request/login.request";
import { signupRequest } from "./request/signup.request";

const userController = createUserController();

const router = Router();

router.post(
  "/user/signup",
  validateRequest(signupRequest),
  userController.signup
);

router.post(
  "/user/login",
  validateRequest(loginRequest),
  userController.login
);

router.get("/user", userController.getAll);

router.get("/user/profile", authMiddleware(), (req, res) => {
  return res.status(200).json({ message: req.user });
});

export default router;
