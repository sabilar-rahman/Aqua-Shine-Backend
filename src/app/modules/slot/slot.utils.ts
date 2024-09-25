// import { TSlot } from "./slot.interface";
// import { SlotModel } from "./slot.model";



// const generateTimeSlots = async (
//     payload: TSlot,
//     duration: number,
//   ) => {
//     const slots = [];
  
//     const [startTimeHours, startTimeMinutes] = payload.startTime
//       .split(":")
//       .map(Number);
//     const [endTimeHours, endTimeMinutes] = payload.endTime.split(":").map(Number);
  
//     const totalStartTime = startTimeHours * 60 + startTimeMinutes;
//     const totalEndTime = endTimeHours * 60 + endTimeMinutes;
  
//     const totalSlotTime = totalEndTime - totalStartTime;
//     const totalSlots = totalSlotTime / duration;
  
//     let currentTime = totalStartTime;
  
//     for (let i = 0; i < totalSlots; i++) {
//       const slotStartTime = currentTime;
//       const slotEndTime = currentTime + duration;
  
//       const startHour = String(Math.floor(slotStartTime / 60)).padStart(2, "0");
//       const startMinute = String(slotStartTime % 60).padStart(2, "0");
//       const endHour = String(Math.floor(slotEndTime / 60)).padStart(2, "0");
//       const endMinute = String(slotEndTime % 60).padStart(2, "0");
  
//       const startTime = `${startHour}:${startMinute}`;
//       const endTime = `${endHour}:${endMinute}`;
  
//       // Check if a slot with the same service, date, and time exists
//       const existingSlot = await SlotModel.findOne({
//         service: payload.service,
//         date: payload.date,
//         startTime: startTime,
//         endTime: endTime,
//       });
  
//       if (existingSlot) {
//         if (
//           existingSlot.isBooked === "available" ||
//           existingSlot.isBooked === "canceled"
//         ) {
//           throw new Error(
//             `This slot service at ${startTime} to ${endTime} is ${existingSlot.isBooked === "available" ? "already" : ""} ${existingSlot.isBooked}`,
//           );
//         }
//       }
  
//       slots.push({
//         service: payload.service,
//         date: payload.date,
//         startTime: startTime,
//         endTime: endTime,
//       });
  
//       currentTime += duration;
//     }
  
//     return slots;
//   };
  
//   export const GenerateTimeSlots = generateTimeSlots;



import { Types } from 'mongoose'

const createSlots = (
  startTime: string,
  endTime: string,
  date: string,
  service: Types.ObjectId,
) => {
  const serviceDuration = 60
  // convert to minutes -> ["9", "30"][0,1]*60
  const startMinutes =
    parseInt(startTime.split(':')[0]) * serviceDuration +
    parseInt(startTime.split(':')[1])
  const endMinutes =
    parseInt(endTime.split(':')[0]) * serviceDuration +
    parseInt(endTime.split(':')[1])
  // calculate total duration
  const totalDuration = endMinutes - startMinutes
  //   calculate number of slots
  const numberOfSlots = totalDuration / serviceDuration
  const slots = []
  for (let i = 0; i < numberOfSlots; i++) {
    //convert slot start time and end time by iteration value
    const slotStartTime = startMinutes + i * serviceDuration
    const slotEndTime = slotStartTime + serviceDuration

    const startHours = Math.floor(slotStartTime / 60)
      .toString()
      .padStart(2, '0')
    const startMins = (slotStartTime % 60).toString().padStart(2, '0')
    const endHours = Math.floor(slotEndTime / 60)
      .toString()
      .padStart(2, '0')
    const endMins = (slotEndTime % 60).toString().padStart(2, '0')
    //push object to the slots
    slots.push({
      service,
      date,
      startTime: `${startHours}:${startMins}`,
      endTime: `${endHours}:${endMins}`,
      isBooked: 'available',
    })
  }
  return slots
}

export default createSlots