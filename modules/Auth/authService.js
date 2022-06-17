import bcrypt from "bcrypt"
import { ErrorException } from "../Errors/errorException.js";
import { TokenModel } from "../token/tokenModel.js";
import { tokenService } from "../token/tokenService.js";
import { UserModel } from "../user/userModel.js";

class AuthService {
  async login(email, password) {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
      throw ErrorException.BadRequest('Не такого пользователя, не пизди!')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      throw ErrorException.BadRequest('Пароль хуйня!')
    }

    const token = await tokenService.generate({ email: user.email, id: user.id })

    await tokenService.save(user.id, token.refreshToken);

    return { user, ...token };
  }

  async logout(refreshToken) {
    const tokenId = await TokenModel.destroy({ where: { refreshToken } })
    return tokenId;
  }
};

const authService = new AuthService();
export { authService };
