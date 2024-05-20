import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js"
import Stripe from "stripe"



const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
// placing user order for frontend

const placeorder =async(req,res)=>{
    const frontendurl= "https://tomato-mern.vercel.app/";
    try {
        const neworder =new ordermodel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await neworder.save();
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_item=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name

                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity

        })) 
        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session =await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:'payment',
            success_url:`${frontendurl}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${frontendurl}/verify?success=false&orderId=${neworder._id}`

        })
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}

const verifyorder=async (req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await ordermodel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }
        else{
            await ordermodel.findOneAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }


}

// user order for front end
const userorders= async(req,res)=>{
    try {
        const orders =await ordermodel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// Listing orders for admin panel
const  listorders=async (req,res)=>{
    try {
        const orders=await ordermodel.find({});
    res.json({success:true,data:orders})

        
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }
    
}

// api for updating order status
const updatestatus=async(req,res)=>{
    try {
        await ordermodel.findByIdAndUpdate(req.body.orderId,{status:req.body.status })
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}
export {placeorder,verifyorder,userorders,listorders,updatestatus}