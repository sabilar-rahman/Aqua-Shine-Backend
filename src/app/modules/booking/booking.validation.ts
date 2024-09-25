import { z } from 'zod'
import { vTypesEnum } from "./booking.constant";

// const bookingCreateValidationSchema = z.object({
//     body: z.object({
//       customer: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
//       serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       slotId: z.string().regex(/^[0-9a-fA-F]{24}$/),
//       vehicleType: z.enum(vTypesEnum),
//       vehicleModel: z.string().min(1),
//       manufacturingYear: z.number(),
//       registrationPlate: z.string().min(1),
//     }),
//   })

const customerSchema = z.object({
  name: z.string().nonempty({ message: "Customer name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  address: z.string().optional(),
});


const bookingCreateValidationSchema = z.object({
  body: z.object({
    customer: customerSchema.optional(),
    serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    slotId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    vehicleType: z.enum(vTypesEnum),
    vehicleModel: z.string().min(1),
    manufacturingYear: z.number(),
    registrationPlate: z.string().min(1),
  }),
})


  export const BookingValidation = {
    bookingCreateValidationSchema,
  }