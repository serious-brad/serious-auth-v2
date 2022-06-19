import jwt from "jsonwebtoken";
import { tokenModel } from "./tokenModel.js";

class TokenService {
  async generate(payload) {
    return {
      accessToken: jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15s' }),
      refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '20s' }),
    }
  }

  async save(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { userId } })

    if (tokenData) {
      tokenData.refreshToken = refreshToken

      return await tokenData.save();
    }

    const token = await tokenModel.create({ userId, refreshToken });

    return token;
  }

  isRefreshTokenValid(refreshToken) {
    try {
      const user = refreshToken && jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
      return user;
    } catch (e) {
      return null;
    }
  }

  isAccessTokenValid(accessToken) {
    try {
      const user = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
      return user;
    } catch (e) {
      console.log('\x1b[34m%s\x1b[0m', 'TokenService.js line:40 e', e);
      return null;
    }
  }
};

const tokenService = new TokenService();
export { tokenService }
