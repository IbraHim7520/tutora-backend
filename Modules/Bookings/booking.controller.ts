import { Request, Response } from "express"
import { bookingService } from "./booking.service";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; [key: string]: any };
    }
  }
}


const createBookings = async(req:Request, res:Response)=>{
    try {
        const {sessionId} = req.body;
        const userid = req.user?.id as string;

        const bookingData = {
            userId : userid,
            teachingsessionId: sessionId as string
        }

        const result = await bookingService.addNewBooking(bookingData);
        return res.status(200).send({seccess: true , data: result});

    } catch (error) {
        return res.status(500).send({seccess: false , message: error ,data: []});
    }
}


const getSingleBookings = async(req: Request , res:Response) =>{
    const userId = req.params.userId as string
    try {
          try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const bookings = await bookingService.getSingleUserBookings(userId);

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Get Single Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user bookings",
    });
  }
    } catch (error) {
        
    }
}


const complteBookingController = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.sessionId as string;

    const response = await bookingService.bookingCompleteUpdate(sessionId);

    return res.status(200).json({
      success: true,
      message: "Booking marked as completed",
      data: response,
    });
  } catch (error: any) {
    console.error("Complete Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to complete booking",
    });
  }
};

const cancelBookingController = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.sessionId as string;

    const response = await bookingService.bookingCancelUpdate(sessionId);

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: response,
    });
  } catch (error: any) {
    console.error("Cancel Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to cancel booking",
    });
  }
};
export const bookingController = {
    createBookings,
    getSingleBookings,
    complteBookingController,
    cancelBookingController
}