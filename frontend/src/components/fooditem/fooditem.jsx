import React, { useContext } from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { storecontext } from '../../context/storecontext'

const Fooditem = ({id,name,price,description,image}) => {

    const {cartItems, addtocart,removefromcart,url}=useContext(storecontext);
  
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className ='food-item-image'src={url+"/images/"+image} alt="" />
            {
                !cartItems[id]
                ?<img className='add' onClick={()=>addtocart(id)}src={assets.add_icon_white} alt="" />
                :<div className='food-item-counter'>
                    <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt="" />

                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">

                {description}
            </p>
                <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default Fooditem