const express = require('express');
const {notFoundError,internalError}=require('./src/commons/utils/handleErrors');
const mongoose = require('mongoose');
const allRouters = require('./src/index.routes');
const setupSwagger = require('./src/config/swagger.config');
const app=express();
const PORT=process.env.PORT;
setupSwagger(app)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(allRouters)
app.use(notFoundError);
app.use(internalError)
mongoose.connect(process.env.DBURI).then(
app.listen(PORT,()=>{
  console.log("app listen to port 3000");
})
)
