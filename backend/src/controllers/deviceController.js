import { errorResponse, successResponse } from "./../utils/response.js";
import {addDeviceService, getAllDeviceUser, getDeviceUser} from "./../services/deviceService.js";

// Get All Devices by User
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

// Get Device By Id
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

// Update Device
export const updateDeviceController = async (req, res) => {
  try {
    const data = await updateDevice(req.params.id, req.body);
    return successResponse(res, data, "Successfuly update device");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Delete Device
export const deleteDeviceController = async (req, res) => {
  try {
    const data = await deleteDevice(req.params.id);
    return successResponse(res, data, "Successfuly delete device");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const addDeviceController = async (req, res) => {
  try {
    const {device_id,user_id,token,name} = req.body;
    const data = await addDeviceService(device_id,token,user_id,name);
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
