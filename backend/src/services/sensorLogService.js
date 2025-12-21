import db from "../models/index.js"
import dayjs from 'dayjs'

export const getSensorLogs = async (time=dayjs().format('YYYY-MM-DD')) => {
    console.log(time)
    return await db.SensorLog.findAll({
        where:db.sequelize.where(db.sequelize.fn("DATE", db.sequelize.col('createdAt')), time)
    })
}