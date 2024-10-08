import { TReview } from './review.interface'
import { ReviewModel } from './review.model'




const createReviewIntoDB = async (payload: TReview)=>{
    const result = await ReviewModel.create(payload)
    return result
}

const getAllReviewsFromDB = async ()=>{
    const result = await ReviewModel.find();
    return result
}



export const ReviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
}