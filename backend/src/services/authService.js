import db from "../models/index.js"
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwtUtil.js";

export const loginService = async ({username,password}) => {
    const user = await db.User.findOne({where: {username}});
    if(user == null){
        throw new Error("User Not Found");
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword){
        throw new Error("Invalid Password");
    }
    const token = generateToken({id: user.id, username: user.username});
    return {
        id: user.id,
        token,
        fullname: user.fullname,
        username: user.username,
        role: user.role
    };
};

export const registerService = async ({username, fullname, password}) => {
    const alreadyUser = await db.User.findOne({where: {username}});
    if(alreadyUser){
        throw new Error("Username already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({username,fullname,password:hashedPassword});
    return user;
};