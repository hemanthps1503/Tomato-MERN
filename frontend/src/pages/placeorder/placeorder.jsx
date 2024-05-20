import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { storecontext } from '../../context/storecontext'
import cart from '../cart/cart'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const placeorder = () => {
  const {gettotalcartamount,token,food_list,cartItems,url}=useContext(storecontext)

  const [data,setdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler =(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({
      ...data,[name]:value
    }))
  }

  const placeOrder= async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id]
        orderItems.push(itemInfo)

      }

    })
    let orderData={
      address:data,
      items:orderItems,
      amount:gettotalcartamount()+2,
    }
    let response =await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url}=response.data;
      window.location.replace(session_url);
      
    }
    else{
      alert("Error");
    }

  }
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')

    }else if(gettotalcartamount()===0){
      navigate('/cart')

    }

  },[token])
  
  return (
   <form onSubmit={placeOrder} className='place-order'>
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input required name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder='First Name' />
        <input required name='lastName' onChange={onchangehandler} value={data.lastName} type="text" placeholder='Last Name' />
      </div>
      <input required name='email' onChange={onchangehandler} value={data.email} type="text"  placeholder='Email Address'/>
      <input required  name='street' onChange={onchangehandler} value={data.street} type="text"  placeholder='Street'/>
      <div className="multi-fields">
        <input required name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City' />
        <input required name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State' />
      </div>
      <div className="multi-fields">
        <input required name='zipcode' onChange={onchangehandler} value={data.zipcode} type="text" placeholder='ZipCode' />
        <input required name='country' onChange={onchangehandler} value={data.country} type="text" placeholder='Country' />
      </div>
      <input required name='phone' onChange={onchangehandler} value={data.phone} type="text" placeholder='phone' />
    </div>
    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${gettotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${gettotalcartamount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${gettotalcartamount()===0?0:gettotalcartamount()+2}</b>
            </div>
          <button type='submit' >Proceed to Payment</button>
        </div>

    </div>
   </form>
  )
}

export default placeorder