import { prisma } from "../../lib/prisma"

interface bookingData {
    userId : string,
    teachingsessionId: string
}

const addNewBooking = async(payload: bookingData)=>{
    return await prisma.sessionBookings.create({
        data: payload
    })
}


 const getSingleUserBookings = async (userId: string) => {
  return prisma.sessionBookings.findMany({
    where: {
      userId: userId,
    },
    select:{
      status:true,
      teachingsession: {
        select: {
          id: true,
          name:true,
          category:true,
          fromTime:true,
          toTime:true,
          date:true,
          teacherEmail:true
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


const bookingCompleteUpdate = async (sessionId: string) => {
  const booking = await prisma.sessionBookings.updateMany({
    where: {
      teachingsessionId: sessionId,
      status: "BOOKED",
    },
    data: {
      status: "COMPLETED",
      updatedAt: new Date(),
    },
  });

  if (booking.count === 0) {
    throw new Error("No active booking found for this session");
  }

  return booking;
};

const bookingCancelUpdate = async (sessionId: string) => {
  const booking = await prisma.sessionBookings.updateMany({
    where: {
      teachingsessionId: sessionId,
      status: "BOOKED",
    },
    data: {
      status: "CANCELLED",
      updatedAt: new Date(),
    },
  });

  if (booking.count === 0) {
    throw new Error("No active booking found to cancel");
  }

  return booking;
};

export const bookingService = {
    addNewBooking,
    getSingleUserBookings,
    bookingCompleteUpdate,
    bookingCancelUpdate
}