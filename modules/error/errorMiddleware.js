import { ErrorException } from "./errorException.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorException) {
    return res.status(err?.status).json({ message: err.message, errors: err.errors });
  }

  console.log('\x1b[41m%s\x1b[0m', 'errorMiddleware.js line:7 err', err);
  return res.status(500).json({ message: "Непредвиденая ошибка. Обратись ко мне" })
}
