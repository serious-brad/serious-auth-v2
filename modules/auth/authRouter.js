import { Router } from "express";
import { authController } from "./authController.js";

const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.post('/refresh', authController.refresh)

export { authRouter }
