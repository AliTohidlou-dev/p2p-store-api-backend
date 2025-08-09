const { userMessage } = require("./user.message");
const Users = require("./user.model")

class UserServices {
  #UserModel
  constructor() {
    this.#UserModel=Users
  }
  async getUser(id){
    const user=await this.#UserModel.findById(id);
    if(!user) return res.status(404).json({message:userMessage.userNotFound})
    return res.status(200).json(user)
  }
}
module.exports= new UserServices()
