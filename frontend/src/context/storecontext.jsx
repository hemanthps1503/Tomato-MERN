import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const storecontext=createContext(null)

const Storecontextprovider=(props)=>{

    const [cartItems,setcartitems]=useState({});
    const url="https://tomato-mern-stjr.onrender.com"
    const [token,settoken]=useState("");
    const  [food_list,setfoodlist]=useState([])
    const addtocart=async(itemId)=>{
        if(!cartItems[itemId]){
            setcartitems((prev)=>({...prev,[itemId]:1}))

        }else{
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }


    }
    const removefromcart=async(itemId)=>{
        setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const gettotalcartamount=()=>{
        let totalamount =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item);
                totalamount+=iteminfo.price * cartItems[item];

            }
           
        }
        return totalamount;
    }

    const fetchfoodlist=async ()=>{
        const response=await axios.get(url+"/api/food/list");
        setfoodlist(response.data.data)
    }
    const loadcartdata=async (token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setcartitems(response.data.cartData)
    }

    useEffect(()=>{
        
        async function loaddata(){
            await fetchfoodlist();
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadcartdata(localStorage.getItem("token"))
            }
        }
        loaddata();

    },[])
    
    const Contextvalue={
        food_list,
        cartItems,
        setcartitems,
        addtocart,
        removefromcart,
        gettotalcartamount,
        url,
        token,
        settoken

       
    }
    return(
        <storecontext.Provider value={Contextvalue}>
            {props.children}
        </storecontext.Provider>
    )
}
export default Storecontextprovider