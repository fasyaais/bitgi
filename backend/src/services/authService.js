import db from "../models"
import bcrpyt from 'bcrpyt';

export const login = ({username,password}) => {
    const user = db.User.findOne({where: {username}});
    if(user == null){
        throw new Error("User Not Found");
    }
    const verifyPassword = bcrpyt.compare();
};

export const register = (user) => {
    
};