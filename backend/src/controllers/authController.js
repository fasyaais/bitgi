import { loginService, registerService } from "../services/authService.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const registerController = async (req,res) => {
    try {
        const {fullname, username, id, createdAt } = await registerService(req.body)
        return successResponse(res, {id,fullname, username,createdAt}, "User registered successfully");
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