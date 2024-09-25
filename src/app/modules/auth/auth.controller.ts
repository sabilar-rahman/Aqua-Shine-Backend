import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { AuthServices } from "./auth.service";

// ============================================================
// Auth Controllers
// ============================================================

/**
 * Registers a new user.
 *
 * This controller receives the user data from the request body, registers
 * the user in the database, and sends a success response.
 *
 * Key functionalities:
 * - Call service to register the user in the database
 * - Return a success message and the created user data

 */

const registeredUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registeredUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

/**
 * Logs in an existing user.
 *
 * This controller receives the login credentials from the request body,
 * logs in the user by generating an access token, and sends it in the response.
 *
 * Key functionalities:
 * - Call service to authenticate the user and generate an access token
 * - Return a success message with the access token and user data
 *
 */

const loginUser = catchAsync(async (req, res) => {
  // ------------------------------------------------------------
  // 1. Authenticate User and Generate Access Token
  // ------------------------------------------------------------
  const result = await AuthServices.loginUser(req.body);
  // const { accessToken, user } = result;

  const { accessToken, user, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "development",
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully!",
    token: accessToken,
    data: user,
  });
});

// refresh token implemented here , for future use

const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token refreshed successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await AuthServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users fetched successfully!",
    data: users,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const updatedUser = await AuthServices.updateUserRoleIntoDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully!",
    data: updatedUser,
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;

  const updatedUser = await AuthServices.updateUserInfoIntoDB(id, updateInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User info updated successfully!",
    data: updatedUser,
  });
});

// ============================================================
// Export Auth Controllers
// ============================================================

export const AuthControllers = {
  registeredUser,
  loginUser,
  refreshToken,
  getAllUsers,
  updateUserRole,
  updateUserInfo,
};
