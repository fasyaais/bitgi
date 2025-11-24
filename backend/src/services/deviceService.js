import db from "../models/index.js"

export const getAllDeviceUser = async (userId) => {
    return await db.Device.findAll({
        where:{user_id : userId},
        attributes : {exclude : ['token']},
        include : {
            model: db.Type,
            as: "type",
        }
    });
}

export const getDeviceUser= async (deviceId,userId) => {
    return await db.Device.findOne({
        where:{id:deviceId,user_id:userId},
        attributes: {exclude : ['token']},
        include : {
            model: db.Type,
            as : "type"
        }
    });
}

export const addDeviceService = async (deviceId,token,userID, name) => {
    try {
        const device = await db.Device.findOne({where:{id:deviceId,token},attributes: {exclude: ['token','last_seen','is_online']}});
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

export const deleteDeviceService = async (deviceId,userId) => {
    try {
        const device = await db.Device.findOne({
            where: {id: deviceId}
        });
        if(!device) throw new Error("Device not found");
        if(device.user_id != userId){
            throw new Error("unauthorized");
        }
        await device.update({
            user_id : null
        });

        return null
    } catch (error) {
        return error.message;
    }
}

export const updateDeviceService = async (id,payload,userId) => {
    try {
        const device = await db.Device.findByPk(id,{attributes: {exclude : ['token']}});
        if(!device){
            throw new Error("Device not found");
        }
        if(device.user_id != userId){
            throw new Error("unauthorized");
        }
        await device.update(payload)
        return device;
    } catch (error) {
        return error.message
    }
}