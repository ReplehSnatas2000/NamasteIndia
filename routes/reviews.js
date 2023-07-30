import Express from "express";
import catchAsync from "../utils/catchAsync.js";
import { validateReview, isLoggedIn, isReviewOwner } from "../middleware.js";
import { deleteReview, postReview } from "../controllers/review_controller.js";
export const router2 = Express.Router({ mergeParams: true });
router2.delete("/:reviewID", isLoggedIn, isReviewOwner, catchAsync(deleteReview));
router2.post("/", isLoggedIn, validateReview, catchAsync(postReview));