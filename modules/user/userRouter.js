import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../auth/authMiddleware.js";
import { userController } from "./userController.js";

const userRouter = Router();
userRouter.route('/user').post(
  body('email').isEmail().withMessage("Неправильно ввели почту"),
  body('password').isLength({ min: 5 }).withMessage("Пароль должен быть не меньше 5 символов"),
  userController.create
)
userRouter.route('/users').get(authMiddleware, userController.getAll)

export { userRouter }
