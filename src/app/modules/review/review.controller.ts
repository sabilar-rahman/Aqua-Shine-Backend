import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReviewIntoDB = catchAsync(async (req, res) => {
  const result = await ReviewService.createReviewIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReviewsFromDB = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllReviewsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const ReviewController = {
  createReviewIntoDB,
  getAllReviewsFromDB
};
