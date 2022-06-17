import jwt from "jsonwebtoken";
import { TokenModel } from "./tokenModel.js";

class TokenService {
  async generate(payload) {
    return {
      accessToken: jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' }),
      refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d' }),
    }
  }

  async save(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { userId } })

    if (tokenData) {
      tokenData.refreshToken = refreshToken

      return await tokenData.save();
    }

    const token = await TokenModel.create({ userId, refreshToken });

    return token;
  }
};

const tokenService = new TokenService();
export { tokenService }
