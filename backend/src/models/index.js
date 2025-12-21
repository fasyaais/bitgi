import { sequelize } from "./../config/database.js";
import Device from "./Device.js";
import Type from "./Type.js";
import User from "./User.js";
import Sensor from "./Sensor.js";
import Actuator from "./Actuator.js";
import Schedule from "./Schedule.js";
import SensorLog from "./SensorLog.js";

const db = {};

db.Type = Type(sequelize);
db.User = User(sequelize);
db.Device = Device(sequelize);
db.Sensor = Sensor(sequelize);
db.Actuator = Actuator(sequelize);
db.Schedule = Schedule(sequelize);
db.SensorLog = SensorLog(sequelize);

db.Device.belongsTo(db.Type, { 
    foreignKey: 'type_id',
    as: 'type' ,
});
db.Device.belongsTo(db.User, { foreignKey: 'user_id', as:"user" });
db.Type.hasMany(db.Device,{ foreignKey: 'type_id', as: "devices" });
db.User.hasMany(db.Device,{ foreignKey: 'user_id',as: "devices" });

db.Schedule.belongsTo(db.Device, { foreignKey: 'device_id', as:"device" });
db.Device.hasMany(db.Schedule, { foreignKey: 'device_id', as:"schedules" });

db.SensorLog.belongsTo(db.Device,{ foreignKey: 'device_id',as:'device' });
db.Device.hasMany(db.SensorLog,{foreignKey:'device_id', as:"logs"})

db.sequelize = sequelize;

db.sync = async () => {
    await sequelize.sync();
    console.log('[DB] All models were synchronized successfully.');
};

export default db;