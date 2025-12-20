import { errorResponse, successResponse } from "../utils/response.js";
import * as ScheduleService from "./../services/scheduleService.js"

export const index = async (req, res) => {
  try {
    const data = await ScheduleService.getAllSchedules(req.userId);
    if(data.length == 0){
        return successResponse(res, [],"Schedule not found");
    }
    return successResponse(res, data, "Successfuly get all schedule");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const show = async (req, res) => {
  try {
    const data = await ScheduleService.showSchedule(req.params.id,req.userId);
    if(!data){
        return successResponse(res,[],"Schedule not found")
    }
    return successResponse(res, data, "Successfuly get schedule by id");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const update = async (req, res) => {
  try {
    const data = await ScheduleService.updateSchedule(req,req.params.id, req.body, req.userId);
    return successResponse(res, data, "Successfuly update schedule");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    const data = await ScheduleService.deleteSchedule(req.params.id,req.userId);
    return successResponse(res, data, "Successfuly delete schedule from user");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const add = async (req, res) => {
  try {
    const data = await ScheduleService.addSchedule(req,req.body,req.userId);
    return successResponse(res, data, "Successfuly add new schedule", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
