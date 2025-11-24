import db from "../../models/index.js"

// GET ALL SENSOR
export const getAllSensor = async () => {
  return await db.Sensor.findAll({
    order: [["id", "DESC"]],
  })
}

// GET SENSOR BY ID
export const getSensorById = async (id) => {
  const sensor = await db.Sensor.findByPk(id)
  if (!sensor) {
    throw new Error("Sensor not found")
  }
  return sensor
}

// CREATE SENSOR
export const addSensor = async (name) => {
  if (!name) throw new Error("Name is required")

  return await db.Sensor.create({ name })
}

// UPDATE SENSOR
export const updateSensor = async (id, payload) => {
  const sensor = await db.Sensor.findByPk(id)
  if (!sensor) {
    throw new Error("Sensor not found")
  }

  await sensor.update(payload)
  return sensor
}

// DELETE SENSOR
export const deleteSensor = async (id) => {
  const sensor = await db.Sensor.findByPk(id)
  if (!sensor) {
    throw new Error("Sensor not found")
  }

  await sensor.destroy()
  return true
}
