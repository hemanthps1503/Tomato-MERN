import mongoose from "mongoose"

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},

},{minimize:false})

const usermodel=mongoose.models.user || mongoose.model("user",userschema);

export default usermodel;
