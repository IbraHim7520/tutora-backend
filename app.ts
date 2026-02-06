import { toNodeHandler } from 'better-auth/node';
import express, { Application } from 'express'
import { auth } from './lib/auth';
import cors from 'cors'
import userRouter from './Modules/Users/user.route';
import cookieParser from "cookie-parser";
import { sessionRouter } from './Modules/Sessions/session.route';
import { bookingRouter } from './Modules/Bookings/booking.route';
import reviewRouter from './Modules/Reviews/review.route';
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
app.use("/api/v1/users" , userRouter);


//Session related api
app.use("/api/v1/session", sessionRouter);

//Session Booking API
app.use("/api/v1/bookings", bookingRouter);

//Review related API
app.use("/api/v1/reviews", reviewRouter);

export default app;