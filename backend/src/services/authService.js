import db from "../models/index.js"
import bcrypt from 'bcrypt';

export const loginService = ({username,password}) => {
    const user = db.User.findOne({where: {username}});
    if(user == null){
        throw new Error("User Not Found");
    }
    const verifyPassword = bcrypt.compare();
};

export const registerService = async ({username, fullname, password}) => {
    const user = await db.User.create({username,fullname,password});
    return user;
};