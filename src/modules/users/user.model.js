const mongoose = require('mongoose');
const OTPSchema=new mongoose.Schema({
  OTPCode:{
    type:String,
  },
  expiresIn:{
    type:Number,
    default:0
  }
},{
  timestamps:true
})
const userSchema=new mongoose.Schema({
  fullName:{
    type:String,
    minLength:3,
    maxLength:25,
    trim:true,
  },
  email:{
    type:String,
    minLength:10,
    maxLength:150,
    trim:true,
  },
  mobile:{
    type:String,
    required:true,
    unique:true,
    minLength:11,
    maxLength:11,
    trim:true,
  },
  OTP:{
    type:OTPSchema,
  },
  verifiedMobile:{
    type:Boolean,
    default:false,
  }
},{
  timestamps:true,
})

const Users=mongoose.model('Users',userSchema);

module.exports=Users;