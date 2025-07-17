const express=require('express');
const authRouter = require('./modules/auth/route/auth.routes');
const allRouters=express.Router();

allRouters.use(authRouter)

module.exports=allRouters;