import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storecontext } from '../../context/storecontext';
import axios from 'axios';

const verify = () => {
    const [searchparams,setsearchparams]=useSearchParams();
    const success =searchparams.get("success");
    const orderId =searchparams.get("orderId");
    const {url}=useContext(storecontext);
    const navigate=useNavigate();

    const verifypayment=async() =>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");

        }
        else{
            navigate("/");
        }
    }
    useEffect(()=>{
        verifypayment();

    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div>

    </div>
  )
}

export default verify