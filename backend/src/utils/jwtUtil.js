import jwt from 'jsonwebtoken';
import config from "./../config/index.js";

export const generateToken = (userId) => {
    const token = jwt.sign({userId}, config.APP_SECRET_KEY,{expiresIn:'1h'});
    return token;
};

export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token,config.APP_SECRET_KEY);
        return decode.userId;
    } catch (error) {
        return null;
    }
};