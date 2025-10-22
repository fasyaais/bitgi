import jwt from 'jsonwebtoken';
import config from "./../config/index.js";

export const generateToken = ({id, username}) => {
    const jwtPayload = {id, username};
    const token = jwt.sign(jwtPayload, config.APP_SECRET_KEY,{expiresIn:'1h'});
    return token;
};

export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token,config.APP_SECRET_KEY);
        return decode;
    } catch (error) {
        return null;
    }
};