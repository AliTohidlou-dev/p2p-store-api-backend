const express=require('express');
const authController = require('../auth.controller');
const authRouter=express.Router();

authRouter.post('/send-otp',authController.sendOTP.bind(authController))
authRouter.post('/check-otp',authController.checkOTP.bind(authController))

module.exports=authRouter;