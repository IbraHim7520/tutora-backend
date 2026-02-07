import { prisma } from "../../lib/prisma";

const userReviewCreate = async (reviewData: {
  userId: string;
  teachingsessionId: string;
  rating: number;
  opinion?: string;
}) => {
  const result = await prisma.userReviews.create({
    data: {
      userId: reviewData.userId,
      teachingsessionId: reviewData.teachingsessionId,
      rating: reviewData.rating,
      opinion: reviewData.opinion || "N/A",
    },
  });

  return result;
};





const getAllSessions = async (teacherId: string) => {
  try {
    return await prisma.userReviews.findMany({
      where: {
        teachingsession: {
          teacherId: teacherId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        teachingsession: {
          select: {
            id: true,
            name: true,
            date: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Get reviews by teacher error:", error);
    throw error;
  }
};

export const reviewService = {
    userReviewCreate,
    getAllSessions
}