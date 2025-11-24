import db from "../../models/index.js"

// GET ALL
export const getAllActuator = async () => {
  return await db.Actuator.findAll({
    order: [["id", "DESC"]],
  })
}

// GET BY ID
export const getActuatorById = async (id) => {
  const actuator = await db.Actuator.findByPk(id)
  if (!actuator) {
    throw new Error("Actuator not found")
  }
  return actuator
}

// CREATE
export const addActuator = async (name) => {
  if (!name) throw new Error("Name is required")

  return await db.Actuator.create({ name })
}

// UPDATE
export const updateActuator = async (id, payload) => {
  const actuator = await db.Actuator.findByPk(id)
  if (!actuator) {
    throw new Error("Actuator not found")
  }

  await actuator.update(payload)
  return actuator
}

// DELETE
export const deleteActuator = async (id) => {
  const actuator = await db.Actuator.findByPk(id)
  if (!actuator) {
    throw new Error("Actuator not found")
  }

  await actuator.destroy()
  return true
}
