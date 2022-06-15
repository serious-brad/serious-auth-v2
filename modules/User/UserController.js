import { userService } from "./UserService.js";

class UserController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await userService.create(email, password);

    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    return res.json(user)
  }

  async getAll(req, res) {
    const users = await userService.getAll();
    return res.json(users);
  }
}

const userController = new UserController()
export { userController }
