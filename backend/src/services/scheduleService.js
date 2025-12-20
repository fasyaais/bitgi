import db from "../models/index.js"

export const getAllSchedules = async (userId) => {
    const schedule = await db.Schedule.findAll({
        attributes:{exclude:['createdAt','updatedAT']},
        include : {
            model: db.Device,
            as: 'device',
            where: {user_id:userId},
            attributes:[]
        }
    })
    return schedule
}

export const showSchedule = async (id,userId) => {
    return await db.Schedule.findOne({
        attributes:{exclude:['createdAt','updatedAt']},
        where: {id},
        include : {
            model: db.Device,
            as: 'device',
            where: {user_id:userId},
            attributes:[]
        }
    })
}

export const addSchedule = async (req,{label, device_id,is_active,duration,time} , user_id) => {
    const foundDevice = await db.Device.findOne({
        where: {
            id: device_id,
            user_id
        }
    })
    if(!foundDevice){
        throw new Error("Device not found or unauthorized")
    }

    const schedule = await db.Schedule.create({label, device_id,is_active,duration,time})
    if(is_active){
        const mqttService = req.app.get('mqttService')
        mqttService.publishControl(device_id,'pump',{time,duration,is_active})
    }
    return schedule
}

export const deleteSchedule = async (id,userId) => {
    const schedule = await showSchedule(id,userId)
    if(!schedule){
        throw new Error("Schedule not found")
    }
    console.log(schedule)
    schedule.destroy()
    return;
}

export const updateSchedule = async (req,id,payload,userId) => {
    const schedule = await showSchedule(id, userId)
    if(!schedule){
        throw new Error("Schedule not found or unouthorized")
    }
    const data = await schedule.update(payload)
    if('is_active' in payload && payload.is_active){
        const mqttService = req.app.get('mqttService')
        const payload = {
            time: data.time,
            duration: data.duration,
            is_active: data.is_active
        }
        mqttService.publishControl(data.device_id,'pump',payload)
    }
    return data
}

export const getScheduleDevice = async (device_id, token) => {
    const device = await db.Device.count({
        where: {
            id : device_id,
            token
        }
    })
    if(device == 0){

        return 
    }
    return await db.Schedule.findAll({
        where: {
            device_id
        },
        attributes: ['label','time','is_active','duration']
    })
}