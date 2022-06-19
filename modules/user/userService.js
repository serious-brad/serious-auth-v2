import { userModel } from "./userModel.js";
import { hash } from "bcrypt";
import { tokenService } from "../token/tokenService.js";

class UserService {
  async create(email, password) {
    const hashPassword = await hash(password, 9);
    const user = await userModel.create({ email, password: hashPassword });
    const token = await tokenService.generate({ email: user.email, id: user.id })

    await tokenService.save(user.id, token.refreshToken);

    return { user, ...token };
  }
  async getAll() {
    const users = await userModel.findAll();
    return users;
  }
}

const userService = new UserService()
export { userService }
