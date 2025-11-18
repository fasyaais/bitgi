import db from "../models/index.js"

export const getAllDeviceUser = async (userId) => {
    return await db.Device.findAll({where:{user_id : userId}});
}

export const getDeviceUser= async (deviceId,userId) => {
    return await db.Device.findOne({where:{id:deviceId,user_id:userId}});
}