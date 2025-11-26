import * as SensorService from "../../services/admin/sensorService.js"
import { successResponse, errorResponse } from "../../utils/response.js"

// GET ALL
export const index = async (req, res) => {
  try {
    const data = await SensorService.getAllSensor()
    if(data.length == 0 ){
      return successResponse(res, data, "Not found sensor")
    }
    return successResponse(res, data, "Successfully retrieved all sensors")
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// GET BY ID
export const show = async (req, res) => {
  try {
    const { id } = req.params
    const data = await SensorService.getSensorById(id)
    if(data.length == 0 ){
      return successResponse(res, data, "Not found sensor")
    }
    return successResponse(res, data, "Successfully retrieved sensor")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}

// CREATE
export const store = async (req, res) => {
  try {

    const data = await SensorService.addSensor(req.body)
    return successResponse(res, data, "Sensor created successfully", 201)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// UPDATE
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const payload = req.body

    const data = await SensorService.updateSensor(id, payload)
    return successResponse(res, data, "Sensor updated successfully")
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

// DELETE
export const destroy = async (req, res) => {
  try {
    const { id } = req.params
    await SensorService.deleteSensor(id)
    return successResponse(res, null, "Sensor deleted successfully")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}
