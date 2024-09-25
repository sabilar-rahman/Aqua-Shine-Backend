import { Router } from "express";
import { SlotController } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
 import ValidateRequest from "../../middlewares/ValidateRequest";
 import { SlotValidations } from "./slot.validation";
// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.constant";

const router = Router();


//  post route unlocked again and remove from service route
router.post(
  "/",auth(USER_ROLE.admin),
  ValidateRequest(SlotValidations.slotCreateValidationSchema),
  SlotController.createSlot
);

router.put('/update/:id', auth(USER_ROLE.admin), SlotController.updateSlot)


// router.get("/availability", SlotController.getAllSlot);

router.get("/", SlotController.getAllSlot);

router.get("/availability/:serviceId", SlotController.getAvailableSlots);






export const SlotRoutes = router;
