import express from "express"
import { addfood ,listfood,removefood} from "../controllers/foodcontroller.js"
import multer from "multer"

const foodrouter=express.Router();

//image storage engine

const storage=multer.diskStorage({destination:"uploads",filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
}})

const upload =multer({storage:storage})

foodrouter.post("/add",upload.single("image"),addfood)
foodrouter.get("/list",listfood)
foodrouter.post("/remove",removefood);










export default foodrouter;