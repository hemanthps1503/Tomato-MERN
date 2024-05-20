import React, {  useContext, useState } from 'react'
import './loginpopup.css'
import { assets } from '../../assets/assets'
import { storecontext } from '../../context/storecontext'
import axios from "axios"

const loginpopup = ({setshowlogin}) => {

  const {url,settoken}=useContext(storecontext)
    const [currentstate,setcurrentstate]=useState("Login")
    const [data,setdata]=useState({
      name:"",
      email:"",
      password:""
    })

    const onchangehandler=(event)=>{
      const name=event.target.name;
      const value =event.target.value;
      setdata(data=>({
        ...data,[name]:value
      }))

    }

    const onlogin=async (event) =>{
      event.preventDefault()
      let newurl=url;
      if(currentstate==="Login"){
        newurl+="/api/user/login"
      }
      else{
        newurl+="/api/user/register"
      }

      const response=await axios.post(newurl,data);
      if(response.data.success){ 
        if (currentstate === "Login") {
        settoken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setshowlogin(false)
      } else {
        alert("Registration successful! Please login.")
        setcurrentstate("Login")
        setdata({ name: "", email: "", password: "" }) // Reset form fields
      }
       

      }else{
        alert(response.data.message)
      }


    }
   
  return (
    <div className='login-pop'>
       <form  onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentstate}</h2>
            <img onClick={()=>setshowlogin(false)}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currentstate==="Login"?<></>:<input name='name' onChange={onchangehandler} value={data.name} type="text" placeholder='Your Name' required />}
            
            <input name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Your Email' required />
            <input name='password' onChange={onchangehandler} value={data.password} type="password" placeholder='Password' required />

        </div>
        <button type='submit'>{currentstate==="Sign Up"? "Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing,i agree to the terms of use & privacy policy</p>

        </div>
        {currentstate==="Login"?<p>Create a new account? <span onClick={()=>setcurrentstate("Sign Up")}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setcurrentstate("Login")}>Login here</span></p>}
        
       

       </form>
    </div>
  )
}

export default loginpopup
