import usermodel from  "../models/usermodel.js" ;
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login

const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await usermodel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }

        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createtoken(user._id);
        res.json({success:true,token})
    

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})

    }

}

const createtoken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register

const registeruser =async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        //checking is user already exists
        const exists=await usermodel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        // hasing user password
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)

        const newuser=new usermodel({
            name:name,
            email:email,
            password:hashedpassword,

        })

        const user=await newuser.save()
        const token =createtoken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {loginuser,registeruser}