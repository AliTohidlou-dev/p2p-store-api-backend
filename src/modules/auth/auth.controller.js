const authServices = require("./auth.service");
class AuthControllers {
  #authServices;
  constructor() {
    this.#authServices = authServices;
  }
  async sendOTP(req, res, next) {
    try {
      const result = await this.#authServices.sendOTP(req.body.mobile);
      res.status(result.status).json({
        status: result.status,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const result = await this.#authServices.checkOTP(mobile, code);
      res.status(result.status).json({
        result
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthControllers();
