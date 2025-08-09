const express=require('express');
const authRouter = require('./modules/auth/route/auth.routes');
const userRouter = require('./modules/users/route/user.routes');
const allRouters=express.Router();

allRouters.use('/auth',authRouter);
allRouters.use('/users',userRouter);

module.exports=allRouters;