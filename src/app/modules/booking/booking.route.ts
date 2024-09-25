import { Router } from "express";

import { BookingController } from "./booking.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { BookingValidation } from "./booking.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

// const routerNo1 = Router();
// const routerNo11 = Router();
// const routerNo2 = Router();

// const routerNo3 = Router();
// // different route

// // ------------------------------------------------------------
// // 1. Router for User to Create a Booking (POST /)
// // ------------------------------------------------------------
// routerNo1.post(
//   "/",
//   auth(USER_ROLE.user),
//   ValidateRequest(BookingValidation.bookingCreateValidationSchema),
//   BookingController.createBooking
// );
// // ------------------------------------------------------------
// // 2. Router for User to Retrieve Their Bookings (GET /)
// // ------------------------------------------------------------
// routerNo11.get("/", auth(USER_ROLE.user), BookingController.getUserBookings);

// // ------------------------------------------------------------
// // 3. Router for Admin to Retrieve All Bookings (GET /)
// // ------------------------------------------------------------

// routerNo2.get("/", auth(USER_ROLE.admin), BookingController.getAllBooking);

// routerNo3.get("/:email", BookingController.getBookingsByEmail);

// export const UserPostBookingRoutes = routerNo1;
// export const UserGetBookingRoutes = routerNo11;
// export const AdminBookingRoutes = routerNo2;
//  export const UserGetBookingByEmailRoutes = routerNo3;

const router = Router();

router.post(
  "/",
  ValidateRequest(BookingValidation.bookingCreateValidationSchema),
  BookingController.createBooking // Ensure this is defined and exported correctly
);

router.get("/", BookingController.getUserBookings);

router.get("/", auth(USER_ROLE.admin) ,BookingController.getAllBooking);

router.get("/:email", BookingController.getBookingsByEmail);

export const bookingRoutes = router;
