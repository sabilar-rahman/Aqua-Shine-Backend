import express from "express";
import { ServiceController } from "./service.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { serviceValidation } from "./service.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { SlotController } from "../slot/slot.controller";
import { SlotValidations } from "../slot/slot.validation";

const router = express.Router();

// router.get('/',OfferServices.)

router.post(
  "/", auth(USER_ROLE.admin),
  ValidateRequest(serviceValidation.serviceCreateValidationSchema),
  ServiceController.createService
);

router.get("/", ServiceController.getAllServices);

router.get("/:id", ServiceController.getSingleService);

// update added by me
router.put(
  "/update/:id",auth(USER_ROLE.admin),
  ValidateRequest(serviceValidation.serviceUpdateValidationSchema),
  ServiceController.updateSingleService
);

router.delete("/:id",auth(USER_ROLE.admin), ServiceController.deleteSingleService);


// create slot for service |||| its removed now and redirected to slot route

// router.post(
//   "/slots",auth(USER_ROLE.admin),
//   ValidateRequest(SlotValidations.slotCreateValidationSchema),
//   SlotController.createSlot
// );




export const ServiceRoutes = router;
