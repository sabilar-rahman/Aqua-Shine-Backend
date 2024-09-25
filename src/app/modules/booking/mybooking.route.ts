import { Router } from "express";

import { BookingController } from "./booking.controller";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";



const router = Router();


router.get("/", auth(USER_ROLE.user), BookingController.getUserBookings);

export const myBookingRoutes = router;
