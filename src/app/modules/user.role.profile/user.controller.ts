import catchAsync from "../utils/catchAsync"
import sendResponse from "../utils/sendResponse"
import { UserService } from "./user.service"

const getAllUser = catchAsync(async (req, res) => {
    const result = await UserService.getAllUserFromDB()
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Users retrieved successfully!',
      data: result,
    })
  })
  
  const updateUserRole = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await UserService.updateUserRoleIntoDB(id)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'User role updated successfully',
      data: result,
    })
  })
  
  const updateUserProfile = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await UserService.updateUserProfile(id, req.body)
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'User profile update successfully!',
      data: result,
    })
  })
  
  export const UserController = {
    getAllUser,
    updateUserRole,
    updateUserProfile,
  }