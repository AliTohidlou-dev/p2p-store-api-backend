export function internalError(error, req, res, next) {  
  return res.status(error.status || 500).json({
    status: error.status || 500,
    error: {
      type: "Internal Error",
      message: error.message || "Internal Server Error",
    },
  });
}
export function notFoundError(req,res,next){
    return res.status(404).json({
      status:404,
      error:{
        type:"Not Found",
        message:"This Route Does Not Exist!!"
      }
    })
}