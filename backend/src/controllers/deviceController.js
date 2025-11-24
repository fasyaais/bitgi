import { errorResponse, successResponse } from "./../utils/response.js";
import {addDeviceService, deleteDeviceService, getAllDeviceUser, getDeviceUser, updateDeviceService} from "./../services/deviceService.js";

export const getAllDeviceUserController = async (req, res) => {
  try {
    const data = await getAllDeviceUser(req.userId);
    if(data.length == 0){
        return errorResponse(res, "Not found device",404);
    }
    return successResponse(res, data, "Successfuly get all device user");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getDeviceByIdController = async (req, res) => {
  try {
    const data = await getDeviceUser(req.params.id,req.userId);
    if(!data){
        return errorResponse(res,"Not found device",404)
    }
    return successResponse(res, data, "Successfuly get device by id");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateDeviceController = async (req, res) => {
  try {
    const data = await updateDeviceService(req.params.id, req.body, req.userId);
    return successResponse(res, data, "Successfuly update device");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteDeviceController = async (req, res) => {
  try {
    const data = await deleteDeviceService(req.params.id,req.userId);
    return successResponse(res, data, "Successfuly delete device from user");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const addDeviceController = async (req, res) => {
  try {
    const {device_id,token,name} = req.body;
    const data = await addDeviceService(device_id,token, req.userId, name);
    return successResponse(res, data, "Successfuly add new device", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await loginService(req.body);
    return successResponse(res, user, "User logged in successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
