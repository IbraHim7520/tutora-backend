import { Request } from "express"
import { auth } from "../../lib/auth"
import { prisma } from "../../lib/prisma"

const getLoggedinUser = async(req : Request ) =>{
    const cookie = req.headers.cookie || ""
    const session = await auth.api.getSession({
        headers: {cookie},
    })
    return session?.user
}

type UpdateProfileInput = {
  name?: string;
  email?: string;
  image?: string;
};


const getAllTeacher = () =>{
    return prisma.user.findMany({
        where: {
            role: "teacher"
        },
        select:{
            id:true,
            name:true,
            email:true,
            image:true,
            teachingsessions: {
                select: {
                    category: true,
                    rating: true
                }
            }
        }
    })
}

const getSessions =async(teacherId:string)=>{
    return await prisma.user.findMany({
        where: {
            id: teacherId,
            role: "teacher"
        },
        select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            email:true,
            teachingsessions: {
                where: {
                    status: "APPROVED"
                }
            }
        }
        
    })
}
const getUserAnalytics = async (userId:string , role:string) => {
  try {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        role: true,
      },
    });

    if (!user) {
      return {message: "No User Found!"}
    }

    const baseInfo = {
      name: user.name,
      email: user.email,
      image: user.image,
      memberSince: user.createdAt,
      role: user.role,
    };

    // ================= STUDENT =================
    if (role === "student") {
      const [booked, completed, cancelled] = await Promise.all([
        prisma.sessionBookings.count({ where: { userId, status: "BOOKED" } }),
        prisma.sessionBookings.count({ where: { userId, status: "COMPLETED" } }),
        prisma.sessionBookings.count({ where: { userId, status: "CANCELLED" } }),
      ]);

      return {
        ...baseInfo,
        totalBookedSessions: booked,
        completedSessions: completed,
        cancelledSessions: cancelled,
      }
    }

    // ================= TEACHER =================
    if (role === "teacher") {
      const sessions = await prisma.teachingsessions.findMany({
        where: { teacherId: userId },
        include: { sessionBookings: true },
      });

      const totalOwnSessions = sessions.length;
      const totalStudents = sessions.reduce(
        (sum, s) => sum + s.sessionBookings.length,
        0
      );

      const averageRating =
        sessions.reduce((sum, s) => sum + s.rating, 0) /
        (sessions.length || 1);

      const [pending, approved, rejected] = await Promise.all([
        prisma.teachingsessions.count({
          where: { teacherId: userId, status: "PENDING" },
        }),
        prisma.teachingsessions.count({
          where: { teacherId: userId, status: "APPROVED" },
        }),
        prisma.teachingsessions.count({
          where: { teacherId: userId, status: "REJECT" },
        }),
      ]);

      return {
        ...baseInfo,
        totalOwnSessions,
        totalEnrolledStudents: totalStudents,
        averageRating: Number(averageRating.toFixed(2)),
        pendingSessions: pending,
        approvedSessions: approved,
        rejectedSessions: rejected,
      }
    }

    // ================= ADMIN =================
    if (role === "admin") {
      const [totalUsers, totalTeachers, totalSessions, pending, approved, rejected] =
        await Promise.all([
          prisma.user.count(),
          prisma.user.count({ where: { role: "teacher" } }),
          prisma.teachingsessions.count(),
          prisma.teachingsessions.count({ where: { status: "PENDING" } }),
          prisma.teachingsessions.count({ where: { status: "APPROVED" } }),
          prisma.teachingsessions.count({ where: { status: "REJECT" } }),
        ]);

      return {
        ...baseInfo,
        totalUsers,
        totalTeachers,
        totalSessions,
        sessionStatusStats: {
          pending,
          approved,
          rejected,
        },
      }
    }

    
  } catch (error) {
    return error
  }
};




const updateProfile = async (req: Request, data: UpdateProfileInput) => {
  // Get the session from the request
  const session = await auth.api.getSession({
    headers: {
      cookie: req.headers.cookie || "",
    },
  });

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  // Update user in database
  const result = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.image && { image: data.image }),
    },
  });

  return result;
};


const allUsersList = async (myId: string) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: myId,
      },
    },
  });
};

export const userService = {
    getLoggedinUser,
    getAllTeacher,
    getSessions,
    getUserAnalytics,
    updateProfile,
    allUsersList
}