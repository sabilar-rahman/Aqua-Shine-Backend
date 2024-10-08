/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import buildQuery from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";
import createSlots, { GenerateTimeSlots } from "./slot.utils";

// ────────────────────────────────────────────────────────────────────────────────
// SERVICE FOR CREATING A SLOT
// This service handles the creation of time slots and saves them to the database
// ────────────────────────────────────────────────────────────────────────────────
// const createSlotServiceIntoDB = async (payload: TSlot) => {
//   // 1. Check if the referenced service exists in the database
//   const isCarServiceExisting = await Service.findById(payload.service);

//   // 2. Throw an error if the service does not exist
//   if (!isCarServiceExisting) {
//     throw new AppError(httpStatus.NOT_FOUND, "Service does not exist");
//   }

//   // 3. Extract the duration of the service (in minutes)
//   const duration = isCarServiceExisting.duration;

//   try {
//     // 4. Generate time slots based on the provided payload and service duration
//     const slots = await GenerateTimeSlots(payload, duration);

//     // 5. If no slots are generated, throw an error indicating no data was found
//     if (slots.length === 0) {
//       throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
//     }

//     // 6. Save the generated slots to the database in bulk
//     const result = await SlotModel.insertMany(slots);

//     // 7. Return the saved slot records
//     return result;
//   } catch (error: any) {
//     // 8. Catch any errors from the slot generation process and handle them appropriately
//     throw new AppError(httpStatus.BAD_REQUEST, error.message);
//   }
// };


// try to create slot


const createSlotServiceIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, date, service } = payload
  const serviceId: any = payload?.service
  const serviceInfo = await Service.isServiceExists(serviceId)
  //   check service available or not
  if (!serviceInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!')
  }
  //check service is deleted or not
  if (serviceInfo.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't create slots, service deleted!")
  }
  const slots = createSlots(startTime, endTime, date, service)
  const result = await SlotModel.create(slots)
  return result
}





// ────────────────────────────────────────────────────────────────────────────────
// SERVICE FOR RETRIEVING ALL AVAILABLE SLOTS
// This service fetches all available time slots based on query parameters
// ────────────────────────────────────────────────────────────────────────────────

// serviceId added to query

// const getAllSlotServiceFromDB = async (query: Record<string, unknown>, serviceId: string) => {
//   // 1. Define fields that can be used for searching
//   const searchAbleFields = ["date"];

//   // 2. Build and execute the query to retrieve available slots
//   const result = await buildQuery(
//     SlotModel.find({ isBooked: "available",service: serviceId  }).populate("service"),
//     query,
//     searchAbleFields
//   );

//   // 3. Return a message if no slots are found
//   if (result.length === 0) {
//     return "No slots available at this moment!";
//   }

//   // 4. Return the retrieved slots
//   return result;
// };


const getAllSlotServiceFromDB = async () => {
  const result = await SlotModel.find().populate('service')
  return result
}







const getSingleSlotServiceById = async (id: string) => {
  const serviceSlot = await SlotModel.findById(id);
  if (!serviceSlot) {
    throw new AppError(httpStatus.NOT_FOUND, "serviceSlot not found");
  }
  return serviceSlot;
};


const updateSlot = async (id: string, payload: Partial<TSlot>) => {
  const slot = await SlotModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }
  return slot;
};


const getAvailableSlotsFromDB = async (query: Record<string, unknown>, serviceId: string) => {
  const searchAbleFields = ["date"];
  const result = await buildQuery(
    SlotModel.find({ isBooked: "available", service: serviceId }).populate("service"),
    query,
    searchAbleFields
  );
  return result
}







export const SlotServices = {
  createSlotServiceIntoDB,
  getAllSlotServiceFromDB,
  getSingleSlotServiceById,
  updateSlot,

  getAvailableSlotsFromDB
};
