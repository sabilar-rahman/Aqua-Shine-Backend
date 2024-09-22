import { Router } from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = Router();


router.post("/", ValidateRequest(ReviewValidation.reviewCreateValidationSchema), ReviewController.createReviewIntoDB);


router.get("/", ReviewController.getAllReviewsFromDB);

export const ReviewRoutes = router