import { errorResponse, successResponse } from "../../utils/response.js";
import {
  createQrCode,
  registerDevice,
  getAllDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from "../../services/admin/deviceService.js";

export const generateQrcodeController = async (req, res) => {
  try {
    const data = await createQrCode(req.body);
    return successResponse(res, data, "Successfuly to create Qrcode");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Get All Devices
export const getAllDevicesController = async (req, res) => {
  try {
    const data = await getAllDevices();
    if (data.length == 0){
      return errorResponse(res,"Not found",404);
    }
    return successResponse(res, data, "Successfuly get all devices");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Get Device By Id
export const getDeviceByIdController = async (req, res) => {
  try {
    const data = await getDeviceById(req.params.id);
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
    const data = await registerDevice(req.body);
    return successResponse(res, data, "Successfuly register new device", 201);
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
