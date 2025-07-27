const authServices = require("./auth.service");
const jwt =require('jsonwebtoken');
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
      const token=jwt.sign({mobile, userId:result.user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
      res.cookie('access_token',token,{
        httpOnly:true,
        secure:false,
        signed:true,
        sameSite: 'none',
        maxAge: 60 * 60 * 100
      })
      res.status(result.status).json({
        result
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthControllers();
