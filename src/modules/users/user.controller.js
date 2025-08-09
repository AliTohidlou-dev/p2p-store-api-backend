const { userMessage } = require("./user.message");
const userService = require("./user.service");

class UserControllers {
  #UserServices
  constructor() {
    this.#UserServices=userService;
  }
  async getUser(res,req,next){
    try {
      const user=req.user;
      const userProfile=await this.#UserServices.getUser(user.id);
      return res.status(200).json({userProfile})
    } catch (error) {
      next(error)
    }
  }
}

module.exports= new UserControllers();