import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js"
import foodrouter from "./routes/foodroute.js"
import userrouter from "./routes/userroute.js"
import 'dotenv/config'
import cartrouter from "./routes/cartroute.js"
import orderrouter from "./routes/orderroute.js"


//app config
const app=express()
const port=4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectdb();

//api endpoint

app.use("/api/food",foodrouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userrouter)
app.use("/api/cart",cartrouter)
app.use("/api/order",orderrouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://hemanth66ps:hemanth2003@cluster0.ndmd62f.mongodb.net/?
