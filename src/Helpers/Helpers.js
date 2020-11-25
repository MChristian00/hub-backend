export default class Helpers {
  constructor() {
    (this.statusCode = null),
    (this.message = null),
    (this.payload = null),
    (this.type = null);
  }

  static setSuccess(statusCode, message, payload) {
    (this.statusCode = statusCode),
    (this.message = message),
    (this.payload = payload),
    (this.type = "success");
  }

  static setError(statusCode, message) {
    (this.statusCode = statusCode),
    (this.message = message),
    (this.type = "error");
  }

  static send(res) {
    if (this.type === "success") {
      return res.status(this.statusCode).json({
        type: this.type,
        message: this.message,
        payload: this.payload,
      });
    }
    return res.status(this.statusCode).json({
      type: this.type,
      message: this.message,
      error: this.message,
    });
  }
}
