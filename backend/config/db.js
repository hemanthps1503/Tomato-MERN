import mongoose from "mongoose";

export const connectdb=async()=>{
    await mongoose.connect('mongodb+srv://hemanth66ps:hemanth2003@cluster0.ndmd62f.mongodb.net/fooddel').then(()=>console.log("db connected"));
}

