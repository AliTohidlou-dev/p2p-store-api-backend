const sanitize = require("sanitize-html");
const Users = require("../users/user.model");
const { authMessage } = require("./auth.message");
const {randomInt}=require('crypto')
class AuthServices {
  #UsersModel;
  constructor() {
    this.#UsersModel = Users;
  }
  async sendOTP(mobile) {
      const sanitizeMobileInput = sanitize(mobile, {
        allowedAttributes: [],
        allowedTags: [],
      });
      const user = await this.#UsersModel.findOne({
      mobile:sanitizeMobileInput,
    });
    if(!user){
      const newUser=this.#UsersModel({
        mobile:sanitizeMobileInput,
        OTP:{
          OTPCode: randomInt(10000,99999),
          expiresIn: new Date(Date.now()+1000*60*2)
        }
      })
      await newUser.save()
      return {
        status:200,
        message:authMessage.sendOTP
      }
    }
    if(user && user.OTP.OTPCode && user.OTP.expiresIn>new Date(Date.now())){
      return({
        status:400,
        message: authMessage.otpexist
      })
    }
    user.OTP.OTPCode=randomInt(10000,99999);
    user.OTP.expiresIn=new Date(Date.now()+1000*60*2);
    await user.save();
    return({
      status:200,
      message:authMessage.sendOTP
    })
  }
  async checkOTP(mobile, code) {}
  async checkUserByMobile(mobile) {
    const user = await this.#UsersModel.findOne({
      mobile,
    });
    if (!user) {
      throw {
        status:404,
        message:authMessage.userNotFound
      };
    }
    return user;
  }
}

module.exports = new AuthServices();
