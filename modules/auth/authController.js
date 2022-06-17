import { authService } from "./authService.js";

class AuthController {
  async login(req, res, next) {
    try {
      const user = await authService.login(req.body.email, req.body.password)

      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(user)
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken)
      res.clearCookie('refreshToken');

      return res.json({ message: `Ты вышел` })
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export { authController }
