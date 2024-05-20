import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeorder,verifyorder,userorders,listorders, updatestatus } from "../controllers/ordercontroller.js"

const orderrouter=express.Router();

orderrouter.post("/place",authMiddleware,placeorder);
orderrouter.post("/verify",verifyorder)
orderrouter.post("/userorders",authMiddleware,userorders)
orderrouter.get('/list',listorders)
orderrouter.post("/status",updatestatus)


export default orderrouter;

