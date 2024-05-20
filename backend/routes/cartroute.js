import express from "express"
import { addTocart,removefromCart,getCart } from "../controllers/cartcontroller.js"
import authMiddleware from "../middleware/auth.js";

const cartrouter=express.Router();

cartrouter.post("/add",authMiddleware,addTocart)
cartrouter.post("/remove",authMiddleware,removefromCart)
cartrouter.post("/get",authMiddleware,getCart)

export default cartrouter;