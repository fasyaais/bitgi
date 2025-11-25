import * as TypeService from "../../services/admin/typeService.js"
import { errorResponse, successResponse } from "../../utils/response.js"

export const getAllTypes = async (req, res) => {
  try {
    const data = await TypeService.getAllTypes()
    if(data.length == 0 ){
      return successResponse(res, data, "Not found type",404)
    }
    return successResponse(res, data, "Successfully retrieved all types")
  } catch (error) {
    return errorResponse(res, error.message, 500)
  }
}

export const getTypeById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await TypeService.getTypeById(id)
    if(data.length == 0 ){
      return successResponse(res, data, "Not found type",404)
    }
    return successResponse(res, data, "Successfully retrieved type")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}

export const addType = async (req, res) => {
  try {
    const { name, actuator, sensor } = req.body
    const data = await TypeService.addType({
      name,
      actuator,
      sensor,
    })

    return successResponse(res, data, "Successfully added type",201)
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

export const updateType = async (req, res) => {
  try {
    const { id } = req.params
    const payload = req.body

    const data = await TypeService.updateType(id, payload)

    return successResponse(res, data, "Successfully updated type")
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

export const deleteType = async (req, res) => {
  try {
    const { id } = req.params
    await TypeService.deleteType(id)

    return successResponse(res, null, "Successfully deleted type")
  } catch (error) {
    return errorResponse(res, error.message, 404)
  }
}