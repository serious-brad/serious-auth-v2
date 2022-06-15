import { Router } from "express";
import { userController } from "./UserController.js";

const userRouter = Router();
userRouter.route('/user').post(userController.create)
userRouter.route('/users').get(userController.getAll)

export { userRouter }
