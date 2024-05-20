import React from 'react'
import './orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const orders = ({url}) => {
  const [orders,setorders]=useState([]);
  const fetchallorders=async()=>{
    const response =await axios.get(url+"/api/order/list");
    if(response.data.success){
      setorders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")

    }

  }
  const statushandler= async(event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchallorders();
    }

  }
  useEffect(()=>{
    fetchallorders();

  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index}className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+ " x "+item.quantity+" ,"
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName+" "+order.address.lastName}
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+","+order.address.state+", "+order.address.country+" ,"+order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              
              </p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>
              statushandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

        ))}
      </div>
    </div>
  )
}

export default orders