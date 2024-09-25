import { Router } from "express";
import { ServiceRoutes } from "../modules/service/service.route";
import { SlotRoutes } from "../modules/slot/slot.route";


import { AuthRoutes } from "../modules/auth/auth.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import { myBookingRoutes } from "../modules/booking/mybooking.route";
import { PaymentRoutes } from "../modules/payment/payment.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },

  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/my-bookings",
    route: myBookingRoutes,
  },


  // {
  //   path: "/my-bookings",
  //   route: UserGetBookingRoutes,
  // },

  // {
  //   path: "/bookings",
  //   route: AdminBookingRoutes,
  // },
  // {
  //   path: "/bookings",
  //   route: UserGetBookingByEmailRoutes,
  // },



  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
