const express = require('express');
const {notFoundError,internalError}=require('./src/commons/utils/handleErrors');
const mongoose = require('mongoose');
const allRouters = require('./src/index.routes');
const setupSwagger = require('./src/config/swagger.config');
const cookieParser = require('cookie-parser');
const app=express();
const PORT=process.env.PORT;
setupSwagger(app)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(allRouters)
app.use(notFoundError);
app.use(internalError)
mongoose.connect(process.env.DB_URI).then(
app.listen(PORT,()=>{
  console.log("app listen to port 3000");
})
)
