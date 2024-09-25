// import { TPaymentInfo } from './payment.interface'
// import crypto from 'crypto'
// import axios from 'axios'
// import { SlotModel } from '../slot/slot.model'
// // import Slot from '../slot/slot.model'

// const createPayment = async (payload: TPaymentInfo) => {
//   const { cus_name, cus_email, cus_phone, amount, slot: _id } = payload
//   const formData = {
//     cus_name,
//     cus_email,
//     cus_phone,
//     amount,
//     tran_id: crypto.randomBytes(16).toString('hex'),
//     signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
//     store_id: 'aamarpaytest',
//     currency: 'BDT',
//     desc: 'Service Booking',
//     cus_add1: 'House 50, Road 5, Block kha, Mirpur-1, Dhaka,',
//     cus_add2: 'Patuakhali,',
//     cus_city: 'Dhaka',
//     cus_country: 'Bangladesh',
//     success_url: `http://localhost:5000/payment/success`,
//     fail_url: `http://localhost:5000/payment/success`,
//     cancel_url: `http://localhost:5000/payment/successk`,
//     type: 'json',
//   }
//   const { data } = await axios.post(
//     'https://secure.aamarpay.com/jsonpost.php',
//     formData,
//   )
//   if (data.result) {
//     await SlotModel.findByIdAndUpdate(
//       _id,
//       { isBooked: 'booked' },
//       { new: true, runValidators: true },
//     )
//   }
//   return data
// }
// export const PaymentService = {
//   createPayment,
// }