import { validationResult } from "express-validator";
import { ErrorException } from "../Errors/errorException.js";
import { userService } from "./userService.js";

class UserController {
  async create(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        throw ErrorException.BadRequest("Ошибка валидации", validationErrors.array());
      }
      const { email, password } = req.body;
      const user = await userService.create(email, password);

      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });

      return res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (error) {
      console.log('%cUserController.js line:25 error', 'color: #007acc;', error);
    }
  }
}

const userController = new UserController()
export { userController }
