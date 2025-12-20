import db from "../../models/index.js"
import Schedule from "../../models/Schedule.js"

// GET ALL
export const getAllSchedule = async () => {
  return await db.Schedule.findAll({
    order: [["id", "DESC"]],
  })
}

// GET BY ID
export const getScheduleById = async (id) => {
  const schedule = await db.Schedule.findByPk(id)
  if (!schedule) {
    throw new Error("Schedule not found")
  }
  return schedule
}

// CREATE
export const addSchedule = async ({label, device_id,is_active,duration,time}) => {
  const foundDevice = await db.Device.findByPk(device_id);
  if (!foundDevice){
    throw new Error("Device not found");
  }
  return await db.Schedule.create({device_id,time,label,is_active,duration});
}

// UPDATE
export const updateSchedule = async (id, payload) => {
  const schedule = await db.Schedule.findByPk(id)
  if (!schedule) {
    throw new Error("Schedule not found")
  }
  if("duration" in payload){
    if(payload.duration < 15000){
      throw new Error("Duration must be greater than 15000 ms")
    }
  }
  await schedule.update(payload)
  return schedule
}

// DELETE
export const deleteSchedule = async (id) => {
  const schedule = await db.Schedule.findByPk(id)
  if (!Schedule) {
    throw new Error("Schedule not found")
  }

  await schedule.destroy()
  return true
}
