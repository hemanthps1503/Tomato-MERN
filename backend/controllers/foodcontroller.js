import { log } from "console";
import foodmodel from "../models/foodmodel.js";
import fs from 'fs';

//add food item

const addfood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

    });
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// all foodlist

const listfood=async(req,res)=>{
    try {
        const foods=await foodmodel.find({});
        res.json({success:true,data:foods})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

//remove fooditem

const removefood= async(req,res)=>{
    try {
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

    
export {addfood,listfood,removefood}
