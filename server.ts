import { Request, Response } from "express";
import app from "./app";
import configs from "./Configs/envConfig";
import connectDB from "./Configs/dbconfig";


app.get("/", (req:Request , res:Response)=>{
    res.send("server is working.......!")
})
connectDB()
app.listen(configs.port, ()=>{
    console.log(`server is running at port : ${configs.port}`);
})