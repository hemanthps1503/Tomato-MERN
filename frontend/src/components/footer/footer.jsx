import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>This is the food restaurant appliaction where you can easily order food based on your preference and order easily. Happy eating</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>

            </div>
            
    <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>AboutUs</li>
            <li>Delivery</li>
            <li>Privacy-Policy</li>
        </ul>
       
        </div>   
        <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9150131303</li>
                    <li>Contact@tomato.com</li>
                </ul>
            </div>         
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 @ Tomato.com -All Rights Reserved.
        </p>
             
        </div>
  )
}

export default footer