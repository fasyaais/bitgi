import { verifyToken } from "../utils/jwtUtil.js";

export default (req,res,next) => {
    const authToken = req.headers.authorization;
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({message:"Access Denial"});
    }
    const token = authToken.split(' ')[1];
    const payload = verifyToken(token);
    if(!payload){
        return res.status(401).json({message:"Access Denial"});
    };
    req.userId = payload.id;
    next()
};