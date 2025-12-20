import { errorResponse, successResponse } from "../../utils/response.js"
import * as ScheduleService from "./../../services/admin/scheduleService.js"

export const index = async (req, res) => {
  try {
    const data = await ScheduleService.getAllSchedule()
    if(data.length == 0 ){
      return successResponse(res, data, "Not found schedule")
    }
    return successResponse(res, data, "Successfully retrieved all schedules")
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// GET BY ID
export const show = async (req, res) => {
  try {
    const { id } = req.params
    const data = await ScheduleService.getScheduleById(id)
    if(data.length == 0 ){
      return successResponse(res, data, "Not found schedule")
    }
    return successResponse(res, data, "Successfully retrieved schedule")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}

// CREATE
export const store = async (req, res) => {
  try {
    const data = await ScheduleService.addSchedule(req.body)
    return successResponse(res, data, "Schedule created successfully", 201)
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

// UPDATE
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const payload = req.body

    const data = await ScheduleService.updateSchedule(id, payload)
    return successResponse(res, data, "Schedule updated successfully")
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

export const destroy = async (req, res) => {
  try {
    const { id } = req.params
    await ScheduleService.deleteSchedule(id)
    return successResponse(res, null, "Schedule deleted successfully")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}