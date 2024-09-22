import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// ------------------------------------------------------------
// 1. User Signup Route
// ------------------------------------------------------------
/**
 * POST /signup
 *
 * This route handles user registration. It validates the request body
 * using `UserValidation.userCreateValidationSchema` and then calls the
 * `registeredUser` controller to create a new user.
 */
router.post(
  "/signup",
  ValidateRequest(UserValidation.userCreateValidationSchema),
  AuthControllers.registeredUser
);

// ------------------------------------------------------------
// 2. User Login Route
// ------------------------------------------------------------

/**
 * POST /login
 *
 * This route handles user login. It validates the request body
 * using `AuthValidation.loginUserValidationSchema` and then calls
 * the `loginUser` controller to authenticate the user.
 */
router.post(
  "/login",
  ValidateRequest(AuthValidation.loginUserValidationSchema),
  AuthControllers.loginUser
);

// ------------------------------------------------------------
// 3. Refresh Token Route
// ------------------------------------------------------------

router.post(
  "/refreshToken",
  ValidateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

// get all users

router.get("/users", auth(USER_ROLE.admin), AuthControllers.getAllUsers);

// update user role
router.patch(
  "/users/:id",
  auth(USER_ROLE.admin),
  ValidateRequest(UserValidation.updateUserValidationSchema),
  AuthControllers.updateUserRole
);

// update user info
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  ValidateRequest(UserValidation.updateUserValidationSchema),
  AuthControllers.updateUserInfo
);

export const AuthRoutes = router;
