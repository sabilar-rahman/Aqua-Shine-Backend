import { z } from 'zod'

const reviewCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    message: z.string().min(1, 'message is required'),
    address: z.string().min(1, ' address is required'),
    rating: z.number().min(0, 'rating must be a positive number'),
    isDeleted: z.boolean().optional(),
  }),
})

export const ReviewValidation = {
  reviewCreateValidationSchema,
}