import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

import { BookingServices } from "./booking.service";
import { TBooking } from "./booking.interface";
import crypto from 'crypto'

// ============================================================
// Booking Controllers
// ============================================================

/**
 * Creates a new booking for a service.
 *
 * This controller extracts booking details from the request body,
 * modifies the object to match the booking schema, and passes the
 * user and booking details to the `BookingServices.createBookingIntoDB` service.
 * The response includes the populated booking details.
 *
 * Key functionalities:
 * - Extract booking details from request body
 * - Modify the object to match the booking schema
 * - Call service to create booking and populate customer, service, and slot details
 * - Return a success message with the booking data
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */

const createBooking = catchAsync(async (req, res) => {
  const user = req.user
  // ------------------------------------------------------------
  // 1. Extract Booking Details from Request Body
  // ------------------------------------------------------------
  const {
    cus_name,
    cus_email,
    cus_phone,
    amount,
    serviceId: service,
    slotId: slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = req.body

  // ------------------------------------------------------------
  // 2. Modify Object to Match Booking Schema
  // ------------------------------------------------------------

  const modifiedObj: TBooking = {
    service: service,
    slot: slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  }

  // ------------------------------------------------------------
  // 3. Create Booking and Populate Related Fields
  // ------------------------------------------------------------
 
  const modifiedPaymentObj = {
    cus_name,
    cus_email,
    cus_phone,
    amount,
    tran_id: crypto.randomBytes(16).toString('hex'),
    signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
    store_id: 'aamarpaytest',
    currency: 'BDT',
    desc: 'Service Booking',
    cus_add1: 'House 50, Road 5, Block kha, Mirpur-1, Dhaka,',
    cus_add2: 'Patuakhali,',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    success_url: `http://localhost:5000/payment/success`,
    fail_url: `http://localhost:5000/payment/success`,
    cancel_url: `http://localhost:5000/payment/successk`,
    type: 'json',
  }
 
  // const result = await (
  //   await (
  //     await (
  //       await BookingServices.createBookingIntoDB(modifiedObj, user)
  //     ).populate('customer')
  //   ).populate('service')
  // ).populate('slot')
  const result = await BookingServices.createBookingIntoDB(
    modifiedObj,
    user,
    modifiedPaymentObj,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking successful',
    data: result,
  })
})

/**
 * Retrieves all bookings from the database.
 *
 * This controller calls the `BookingServices.getAllBookingsFromDB` service
 * to retrieve all the bookings and sends the data back in the response.
 *
 * Key functionalities:
 * - Call service to get all bookings
 * - Return a success message with the list of bookings
 *
 */



const getAllBooking = catchAsync(async (req, res) => {
   // ------------------------------------------------------------
  // 1. Get All Bookings from the Database
  // ------------------------------------------------------------
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

/**
 * Retrieves bookings for the logged-in user.
 *
 * This controller gets the authenticated user's information from the request object,
 * calls the `BookingServices.getUserBookingsFromDB` service to retrieve the user's
 * bookings, and sends the data back in the response.
 *
 * Key functionalities:
 * - Extract user information from request object
 * - Call service to get bookings for the specific user
 * - Return a success message with the user's bookings
 */

const getUserBookings = catchAsync(async (req, res) => {
  const user = req.user;
  // ------------------------------------------------------------
  // 1. Get Bookings for the Logged-in User
  // ------------------------------------------------------------
  const result = await BookingServices.getUserBookingsFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});


const getBookingsByEmail = catchAsync(async (req, res) => {
  const email = req.params.email; // Assuming email is passed as a URL parameter
  const bookings = await BookingServices.getBookingsByUserEmail(email);

  res.status(200).json({
    status: httpStatus.OK,
    message: "Bookings retrieved successfully",
    success: true,
    data: bookings,
  });
});



export const BookingController = {
  createBooking,
  getAllBooking,
  getUserBookings,
  getBookingsByEmail
};
