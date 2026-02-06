import { Request, Response } from "express"
import { reviewService } from "./review.service";

const createReviewsController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const reviewData = req.body;

    if (!user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!reviewData?.teachingsessionId || !reviewData?.rating) {
      return res.status(400).json({
        success: false,
        message: "teachingsessionId and rating are required",
      });
    }

    const payload = {
      ...reviewData,
      userId: user.id,
    };

    const result = await reviewService.userReviewCreate(payload);

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Create Review Error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to create review",
    });
  }
};

export const reviewController = {
    createReviewsController
}