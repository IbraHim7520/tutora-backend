import { toNodeHandler } from 'better-auth/node';
import express, { Application } from 'express'
import { auth } from './lib/auth';
import cors from 'cors'
import userRouter from './Modules/Users/user.route';
import cookieParser from "cookie-parser";
const app : Application = express()



app.use(cookieParser());

app.use(cors({
    origin:  process.env.APP_URL ||"http://localhost:3000",
    credentials: true
}))
app.use(express.json())



//*Authenticantion routers
app.all("/api/auth/*splat" , toNodeHandler(auth))


//* User related API
app.use("/api/v1/users/" , userRouter);






export default app;