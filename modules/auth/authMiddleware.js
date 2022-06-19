import { ErrorException } from "../error/errorException.js";
import { tokenService } from "../token/tokenService.js";

export const authMiddleware = async (req, res, next) => {
  try {

    const auth = req?.headers?.authorization;
    if (!auth) {
      throw ErrorException.Unauthorized();
    }

    const accessToken = auth.split(" ")[1];
    if (!accessToken) {
      throw ErrorException.Unauthorized();
    }

    const user = tokenService.isAccessTokenValid(accessToken)
    const { refreshToken } = req.cookies;
    const userData = tokenService.isRefreshTokenValid(refreshToken)

    if (!user || !userData) {
      throw ErrorException.Unauthorized();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
}
