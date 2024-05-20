import express from "express"
import { loginuser,registeruser } from "../controllers/usercontroller.js"

const userrouter=express.Router()

userrouter.post("/register",registeruser)
userrouter.post("/login",loginuser)

export default userrouter;