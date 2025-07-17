const { url } = require('inspector');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi=require("swagger-ui-express");

const swaggerSep=swaggerJsdoc({
  definition:{
    info:{
      title:"divar backend",
      description:"divar backend Apis",
      version:'1.0.0'
    }
  },
  servers:[{
    url:'http://localhost:3000/'
  }],
  apis:[]
})

const setupSwagger=(app)=>{
  app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(swaggerSep))
}
module.exports=setupSwagger;