import { Router } from "express";
import { reviewController } from "./review.controller";
import { requireAuth } from "../../middlewere/verify";

const reviewRouter = Router();

reviewRouter.post('/new-reviews' , requireAuth("student", "teacher", "admin") ,reviewController.createReviewsController);

export default reviewRouter;