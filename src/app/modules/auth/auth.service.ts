import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import status from "http-status";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { createRefreshToken } from "./auth.index";
import httpStatus from "http-status";

// ============================================================
// Authentication Services
// ============================================================

/**
 * Registers a new user into the database.
 *
 * This function accepts user data and creates a new user document
 * in the database using the `UserModel`.
 *
 * Key functionalities:
 * - Create a new user in the database
 *
 * @param {TUser} payload - The user data for registration
 * @returns {Promise<User>} - The newly created user document
 */

const registeredUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

/**
 * Authenticates a user and generates an access token.
 *
 * This function verifies the user's credentials by checking if the
 * user exists and if the provided password matches the stored hash.
 * If authentication succeeds, it generates a JWT access token.
 *
 * Key functionalities:
 * - Find the user by email
 * - Verify the password
 * - Generate an access token
 *
 * @param {TLoginUser} payload - The login credentials (email and password)
 * @returns {Promise<{ accessToken: string, user: User }>} - The access token and user info
 */

const loginUser = async (payload: TLoginUser) => {
  // ------------------------------------------------------------
  // 1. Find User by Email
  // ------------------------------------------------------------
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  // Check if the user exists
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User does not exist!");
  }
  // ------------------------------------------------------------
  // 2. Check if Password Matches
  // ------------------------------------------------------------
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  // If password does not match, throw an error
  if (!isPasswordMatched) {
    throw new AppError(400, "Password does not match!");
  }
  // ------------------------------------------------------------
  // 3. Generate JWT Access Token
  // ------------------------------------------------------------
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  // Generate the JWT access token with expiration
  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
  //   expiresIn: config.jwt_access_expires_in,
  // });


  const accessToken = createRefreshToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createRefreshToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  // ------------------------------------------------------------
  // 4. Return Access Token and User Info
  // ------------------------------------------------------------
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user,
  };
};


// Refresh token here , 

// const refreshToken = async (refreshToken: string) => {
//   const result = (await jwt.verify(
//     refreshToken,
//     config.jwt_refresh_secret as string
//   )) as JwtPayload;

//   console.log(result);

//   const { userEmail } = result;

//   const user = await UserModel.findOne({ email: userEmail });
//   if (!user) {
//     throw new AppError(status.NOT_FOUND, "User does not exist!");
//   }
//   const jwtPayload = {
//     userEmail: user?.email,
//     role: user?.role,
//   };

//   const accessToken = createRefreshToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string
//   );

//   return {
//     accessToken,

//     user,
//   };
// };


const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload
  console.log(decoded)
  const { userEmail } = decoded
  const user = await UserModel.findOne({ email: userEmail })
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exists!')
  }

  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  }
  const accessToken = createRefreshToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  return {
    accessToken,
  }
}




const getAllUserFromDB = async () => {
  const users = await UserModel.find({});
  return users;
};

// Update a user's role by userId
const updateUserRoleIntoDB = async (
  userId: string,
  newRole: "admin" | "user"
) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.role = newRole;
  await user.save();
  return user;
};

// const updateUserInfoIntoBD = async (
//   id: string,
//   updatedData: Partial<TUser>
// ) => {
//   const user = await UserModel.findByIdAndUpdate(id, updatedData, {
//     new: true, // Return the updated user
//     runValidators: true, // Ensure validation is run on the updated data
//   });

//   // If no user is found, throw a "User not found" error
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   return user; // Return the updated user data
// };

const updateUserInfoIntoDB = async (id: string, updateInfo: Partial<TUser>) => {
  // Find the user by ID and update their information

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateInfo, {
    new: true,
    runValidators: true,
  });

  // If no user is found, throw a "User not found" error
  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedUser;
};

export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
  refreshToken,

  getAllUserFromDB,
  updateUserRoleIntoDB,
  updateUserInfoIntoDB,
};
