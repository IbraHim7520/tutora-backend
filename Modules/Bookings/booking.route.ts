import { Router } from "express";
import { bookingController } from "./booking.controller";
import { requireAuth } from "../../middlewere/verify";

export const bookingRouter = Router();

bookingRouter.post("/confirm-bookings", requireAuth("student") ,bookingController.createBookings);
bookingRouter.get("/my-bookings/:userId", requireAuth("student") , bookingController.getSingleBookings)

bookingRouter.put('/complete-session/:sessionId', requireAuth("student" , "teacher", "admin") , bookingController.complteBookingController)
bookingRouter.put('/cancel-session/:sessionId', requireAuth("student" , "teacher", "admin") , bookingController.cancelBookingController)