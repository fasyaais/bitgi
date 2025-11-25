import { errorResponse, successResponse } from "../../utils/response.js"
import * as ActuatorService from "./../../services/admin/actuatorService.js"

export const index = async (req, res) => {
  try {
    const data = await ActuatorService.getAllActuator()
    if(data.length == 0 ){
      return successResponse(res, data, "Not found actuator",404)
    }
    return successResponse(res, data, "Successfully retrieved all actuators")
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// GET BY ID
export const show = async (req, res) => {
  try {
    const { id } = req.params
    const data = await ActuatorService.getActuatorById(id)
    if(data.length == 0 ){
      return successResponse(res, data, "Not found actuator",404)
    }
    return successResponse(res, data, "Successfully retrieved actuator")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}

// CREATE
export const store = async (req, res) => {
  try {
    const data = await ActuatorService.addActuator(req.body)
    return successResponse(res, data, "Actuator created successfully", 201)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// UPDATE
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const payload = req.body

    const data = await ActuatorService.updateActuator(id, payload)
    return successResponse(res, data, "Actuator updated successfully")
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params
    await ActuatorService.deleteActuator(id)
    return successResponse(res, null, "Actuator deleted successfully")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}