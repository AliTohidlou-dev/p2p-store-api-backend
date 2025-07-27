const sanitize = require("sanitize-html");
const Users = require("../users/user.model");
const { authMessage } = require("./auth.message");
const { randomInt } = require("crypto");
class AuthServices {
  #UsersModel;
  constructor() {
    this.#UsersModel = Users;
  }
  async sendOTP(mobile) {
    const user = await this.#UsersModel.findOne({
      mobile
    });
    if (!user) {
      const newUser = this.#UsersModel({
        mobile,
        OTP: {
          OTPCode: randomInt(10000, 99999),
          expiresIn: new Date(Date.now() + 1000 * 60 * 2),
        },
      });
      await newUser.save();
      return {
        status: 200,
        message: authMessage.sendOTP,
      };
    }
    if (
      user.OTP &&
      user.OTP.OTPCode &&
      user.OTP.expiresIn > new Date(Date.now())
    ) {
      return {
        status: 400,
        message: authMessage.otp_exist,
      };
    }
    user.OTP.OTPCode = randomInt(10000, 99999);
    user.OTP.expiresIn = new Date(Date.now() + 1000 * 60 * 2);
    await user.save();
    return {
      status: 200,
      message: authMessage.sendOTP,
    };
  }
  async checkOTP(mobile, code) {
    const now = new Date(Date.now());
    await this.checkUserByMobile(mobile);
    const user = await this.#UsersModel.findOne({
      mobile
    });
    if (!user.OTP || !user.OTP.OTPCode) {
      throw {
        status: 404,
        type: authMessage.typeNotFound,
        message: authMessage.otpNotFound,
      };
    }
    if (user.OTP.expiresIn < now) {
      throw {
        status: 400,
        type:authMessage.typeInvalidData,
        message: authMessage.otp_expired,
      };
    }
    if (user.OTP.OTPCode !== code) {
      throw {
        status: 400,
        type:authMessage.typeInvalidData,
        message: authMessage.otpCodeIncorrect,
      };
    }
    if (user.verifiedMobile===false) user.verifiedMobile = true;
    await user.save();
    return {
      status: 200,
      message: authMessage.login,
      user
    };

  }
  async checkUserByMobile(mobile) {
    const user = await this.#UsersModel.findOne({
      mobile,
    });
    if (!user) {
      throw {
        status: 404,
        type:authMessage.typeNotFound,
        message: authMessage.userNotFound,
      };
    }
    return user;
  }
}

module.exports = new AuthServices();
