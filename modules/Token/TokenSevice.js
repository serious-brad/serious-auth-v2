import jwt from "jsonwebtoken";
import { TokenModel } from "./TokenModel.js";

class TokenService {
  async generate(payload) {
    return {
      accessToken: jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' }),
      refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d' }),
    }
  }
  async save(userId, refreshToken) {
    const token = await TokenModel.findOne({ where: { userId } })

    if (token) {
      token.refreshToken = refreshToken

      return await token.save();
    }

    await TokenModel.create({ userId, refreshToken });

    return token;
  }
};

const tokenService = new TokenService();
export { tokenService }
