import {errorResponse,successResponse} from "../utils/response.js";
import { createQrCode, registerDevice } from "../services/deviceService.js";

export const generateQrcodeController = async (req,res) => {
    try {
        const data = await createQrCode(req.body)
        return successResponse(res, data, "Successfuly to create Qrcode");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const addDeviceController = async (req,res) => {
    try {
        const data = await registerDevice(req.body);
        return successResponse(res,data,"Successfuly register new device",201);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const loginController = async (req,res) => {
    try {
        const user = await loginService(req.body);
        return successResponse(res, user, "User logged in successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}