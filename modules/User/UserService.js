import { UserModel } from "./UserModel.js";
import { hash } from "bcrypt";
import { tokenService } from "../Token/TokenSevice.js";

class UserService {
  async create(email, password) {
    const hashPassword = await hash(password, 9);
    const user = await UserModel.create({ email, password: hashPassword });
    const token = await tokenService.generate({ email: user.email, password: user.password, id: user.id })

    await tokenService.save(user.id, token.refreshToken);

    return { user, ...token };
  }
  async getAll() {
    const users = await UserModel.findAll();
    return users;
  }
}

const userService = new UserService()
export { userService }
