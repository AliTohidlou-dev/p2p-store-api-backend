const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi=require("swagger-ui-express");

const swaggerSep=swaggerJsdoc({
  definition:{
    openapi:'3.0.0',
    info:{
      title:"divar backend",
      description:"divar backend Apis",
      version:'1.0.0'
    }
  },
  servers:[{
    url:'http://localhost:3000/'
  }],
  apis:[process.cwd()+'/src/modules/**/*.swagger.js']
})

const setupSwagger=(app)=>{
  app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(swaggerSep))
}
module.exports=setupSwagger;