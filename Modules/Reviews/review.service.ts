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

export const reviewService = {
    userReviewCreate
}