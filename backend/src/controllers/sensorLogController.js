import {getSensorLogs} from "./../services/sensorLogService.js"
import { errorResponse, successResponse } from "../utils/response.js";

export const index = async (req,res) => {
    try {
        const data = await getSensorLogs(req.query.s)
        return successResponse(res, data, "Successfully to get sensor logs");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}
