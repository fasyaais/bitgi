import db from "../models/index.js"

export const getAllDeviceUser = async (userId) => {
    return await db.Device.findAll({where:{user_id : userId}});
}

export const getDeviceUser= async (deviceId,userId) => {
    return await db.Device.findOne({where:{id:deviceId,user_id:userId}});
}

export const addDeviceService = async (deviceId,token,userID, name) => {
    try {
        const device = await db.Device.findOne({where:{id:deviceId,token}});
        if(!device ) throw new Error("Device not found");
        if(device.user_id) throw new Error("unauthorized");
        await device.update({
            user_id : userID,
            name
        });

        return device;
    } catch (error) {
        throw new Error(error.message)
    } 
}