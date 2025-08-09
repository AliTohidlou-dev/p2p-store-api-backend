const express=require('express');
const Authorization = require('../../../commons/guard/authorization.guard');
const userController = require('../user.controller');
const userRouter=express.Router();
userRouter.get('/my-profile',Authorization,userController.getUser.bind(userController))

module.exports=userRouter;