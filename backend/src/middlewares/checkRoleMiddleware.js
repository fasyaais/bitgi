import { verifyToken } from "../utils/jwtUtil.js";
import db from "../models/index.js";
import { errorResponse } from "./../utils/response.js"

export default  (role) => {
    return async (req,res,next) => {
        try {
            const user = await db.User.findByPk(req.userId);
            
            if(user.role != role){
                return errorResponse(res,"Unauthorized",401);
            }
            req.role = user.role;
            next()
        } catch (error) {
            return errorResponse(res,"Internal server error",500);
        }
    }
};