import jwt from "jsonwebtoken";
import { userService } from "../User/UserService.js";
import { TokenModel } from "./TokenModel.js";

class TokenService {
  async login(email, password) {
    const user = userService.getByEmail({ email })
    if(!user){
      throw new Error('Не такого пользователя, не пизди!')
    }
  }
  async logout() {
  }
};

const tokenService = new TokenService();
export { tokenService }
