const express=require('express');
const authController = require('../auth.controller');
const authRouter=express.Router();
const Authorization=require('../../../commons/guard/authorization.guard')
authRouter.post('/send-otp',authController.sendOTP.bind(authController))
authRouter.post('/check-otp',Authorization,authController.checkOTP.bind(authController))

module.exports=authRouter;