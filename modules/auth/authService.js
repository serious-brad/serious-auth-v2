import bcrypt from "bcrypt"
import { ErrorException } from "../error/errorException.js";
import { tokenModel } from "../token/tokenModel.js";
import { tokenService } from "../token/tokenService.js";
import { userModel } from "../user/userModel.js";

class AuthService {
  async login(email, password) {
    const user = await userModel.findOne({ where: { email } })

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
    const tokenId = await tokenModel.destroy({ where: { refreshToken } })
    return tokenId;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ErrorException.Unauthorized()
    }

    const userData = tokenService.isRefreshTokenValid(refreshToken);
    const tokenData = await tokenModel.findOne({ where: { refreshToken } })

    if (!tokenData || !userData) {
      throw ErrorException.Unauthorized()
    }

    const user = await userModel.findOne({ where: { id: tokenData.userId } })
    const token = await tokenService.generate({ email: user.email, id: user.id })

    await tokenService.save(user.id, token.refreshToken);

    return { user, ...token };
  }
};

const authService = new AuthService();
export { authService };
