/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import mongoose from "mongoose";

import axios from 'axios'
// ============================================================
// Booking Services
// ============================================================



// const createBookingIntoDB = async (payload: TBooking, user: JwtPayload ,formData: any,) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // ------------------------------------------------------------
//     // 1. Find Customer (User) from the Database
//     // ------------------------------------------------------------
//     const customer = await UserModel.findOne({ email: user?.userEmail });
//     const customerId = customer?._id;

//     // Check if the customer exists
//     if (!customer) {
//       throw new AppError(404, "Customer not found");
//     }

//     // ------------------------------------------------------------
//     // 2. Validate Service Exists and Is Available
//     // ------------------------------------------------------------
//     const serviceId: any = payload?.service;
//     const service = await Service.isServiceExists(serviceId);

//     // Check if the service exists
//     if (!service) {
//       throw new AppError(404, "Service not found!");
//     }

//     // Check if the service is deleted
//     if (service.isDeleted) {
//       throw new AppError(400, "Unable to book, service is deleted");
//     }

//     // ------------------------------------------------------------
//     // 3. Validate Slot Exists and Is Available
//     // ------------------------------------------------------------
//     const isSlotExists = await SlotModel.findById(payload.slot);

//     // Check if the slot exists
//     if (!isSlotExists) {
//       throw new AppError(404, "Slot not found!");
//     }

//     // Check if the slot is already booked
//     if (isSlotExists.isBooked === "booked") {
//       throw new AppError(404, "Slot is already booked!");
//     }

//     // ------------------------------------------------------------
//     // 4. Create Booking and Update Slot Status in a Transaction
//     // ------------------------------------------------------------
//     // Create the booking (transaction-1)
//     // const [booking] = await BookingModel.create(
//     //   [{ ...payload, customer: customerId }],
//     //   { session }
//     // );

//      // make payment

//      const { data } = await axios.post(
//       'https://secure.aamarpay.com/jsonpost.php',
//       formData,
//     )

//     if (data.result) {
//       //creating booking- transaction-1
//       const [booking] = await BookingModel.create(
//         [{ ...payload, customer: customerId }],
//         { session },
//       )
//     }







//     // Update the slot's status to 'booked' (transaction-2)
//     await SlotModel.findByIdAndUpdate(
//       payload.slot,
//       { isBooked: "booked" },
//       { new: true, session }
//     );

//     // Commit the transaction
//     await session.commitTransaction();
//     await session.endSession();

//     // return booking;
//     return data;


//   } catch (err) {
//     // Abort the transaction in case of error
//     await session.abortTransaction();
//     await session.endSession();
//     throw err;
//   }
// };

const createBookingIntoDB = async (
  payload: TBooking,
  user: JwtPayload,
  formData: any,
) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //find user from db
    const customer = await UserModel.findOne({ email: user?.userEmail })
    const customerId = customer?._id
    //check user is exists or not
    if (!customer) {
      throw new AppError(404, 'Customer not found')
    }
    //check is service exists or not
    const serviceId: any = payload?.service
    const service = await Service.isServiceExists(serviceId)
    if (!service) {
      throw new AppError(404, 'Service not found!')
    }
    // check service deleted or not
    if (service.isDeleted) {
      throw new AppError(400, 'Unable to book, service is deleted')
    }
    //check slots exists or not
    const isSlotExists = await SlotModel.findById(payload.slot)
    if (!isSlotExists) {
      throw new AppError(404, 'Slot not found!')
    }
    //check slots is booked or available
    if (isSlotExists.isBooked === 'booked') {
      throw new AppError(404, 'Slot is already booked!')
    }
    // make payment

    const { data } = await axios.post(
      'https://secure.aamarpay.com/jsonpost.php',
      formData,
    )

    if (data.result) {
      //creating booking- transaction-1
      const [booking] = await BookingModel.create(
        [{ ...payload, customer: customerId }],
        { session },
      )
    }

    //updating slot status: transaction-2
    await SlotModel.findByIdAndUpdate(
      payload.slot,
      { isBooked: 'booked' },
      { new: true, session },
    )

    await session.commitTransaction()
    await session.endSession()
    return data
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
}







const getAllBookingsFromDB = async () => {
  // ------------------------------------------------------------
  // 1. Get All Bookings with Populated Fields
  // ------------------------------------------------------------
  const result = await BookingModel.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};


const getUserBookingsFromDB = async (user: JwtPayload) => {
  // ------------------------------------------------------------
  // 1. Find the User by Email
  // ------------------------------------------------------------
  const customer = await UserModel.findOne({ email: user?.userEmail });
  const customerId = customer?._id;

  // ------------------------------------------------------------
  // 2. Get the User's Bookings with Populated Fields
  // ------------------------------------------------------------
  const result = await BookingModel.find({ customer: customerId })
    .populate("customer")
    .populate("service")
    .populate("slot");

  return result;
};


const getBookingsByUserEmail = async (email: string) => {
  const bookings = await BookingModel.find({ "customer.email": email }).exec();
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  getBookingsByUserEmail
};
