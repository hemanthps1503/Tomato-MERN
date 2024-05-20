import usermodel from "../models/usermodel.js"

// add items to user cart
const addTocart=async(req,res)=>{
    try {
        let userData=await usermodel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;

        }
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error1"})
        
    }

}



//remove items from usercart

const removefromCart=async(req,res)=>{
    try {
        let userData=await usermodel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})



    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}


// fetchuser cartData

const getCart=async(req,res)=>{

    try {
        let userData=await usermodel.findById(req.body.userId)
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {addTocart,removefromCart,getCart}