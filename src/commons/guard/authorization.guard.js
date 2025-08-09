const jwt = require("jsonwebtoken");
const authorizationMessage = require("../messages/authorization.message");
const Users = require("../../modules/users/user.model");
const Authorization = async (req, res, next) => {
  try {
    const token = req.signedCookies["access-token"];
    if (!token) {
      return res.status(401).json({ message: authorizationMessage.login });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(data.id, { verifiedMobile: 0, OTP: 0 });
    if (!user) {
      return res
        .status(401)
        .json({ message: authorizationMessage.unauthorized });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: authorizationMessage.loginAgain });
  }
};
module.exports = Authorization;
