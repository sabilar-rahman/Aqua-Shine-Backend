import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { SlotServices } from "./slot.service";

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLER FOR CREATING A NEW SLOT
// Handles the creation of a new slot and saves it to the database
// ────────────────────────────────────────────────────────────────────────────────
const createSlot = catchAsync(async (req, res) => {
  // 1. Call the service to create a slot using the data from the request body
  const result = await SlotServices.createSlotServiceIntoDB(req.body);

  // 2. Send a successful response with the created slot details
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully",
    data: result,
  });
});

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLER FOR RETRIEVING ALL SLOTS
// Fetches all available slots based on query parameters
// ────────────────────────────────────────────────────────────────────────────────
const getAllSlot = catchAsync(async (req, res) => {
  // 1. Fetch all available slots from the database using query parameters
  const { serviceId } = req.params
  const query = req.query
  const result = await SlotServices.getAllSlotServiceFromDB(query, serviceId);

  // 2. Send a successful response with the retrieved slot data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});



const getAvailableSlots = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const query = req.query
  const result = await SlotServices.getAvailableSlotsFromDB(query, serviceId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  })
})











// update slot
// const updateSlot = catchAsync(async (req: Request, res: Response) => {
//   const slotId = req.params.id;
//   const updatedData = req.body;
//   const slot = await SlotServices.updateSlot(slotId, updatedData);

//   res.status(200).json({
//     success: true,
//     status: httpStatus.OK,
//     message: "slot updated successfully",
//     data: slot,
//   });
// });

const updateSlot = catchAsync(async (req, res) => {
  const {id} = req.params;
  const updatedData = req.body;
  const slot = await SlotServices.updateSlot(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "slot updated successfully",
    data: slot,
  });
});

export const SlotController = {
  createSlot,
  getAllSlot,
  updateSlot,

  getAvailableSlots
};
