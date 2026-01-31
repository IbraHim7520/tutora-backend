import { toNodeHandler } from 'better-auth/node';
import express, { Application } from 'express'
import { auth } from './lib/auth';
import cors from 'cors'
import userRouter from './Modules/Users/user.route';
const app : Application = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())



//*Authenticantion routers
app.all("/api/auth/*splat" , toNodeHandler(auth))


//* User related API
app.use("/api/v1/users/" , userRouter);



export default app;