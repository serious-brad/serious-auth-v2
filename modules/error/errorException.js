export class ErrorException extends Error {
  constructor(status, message, errors = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ErrorException(401, 'Пользователь не авторизован')
  }

  static BadRequest(message, errors = []) {
    return new ErrorException(400, message, errors)
  }
}
