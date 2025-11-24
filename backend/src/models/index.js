import { sequelize } from "./../config/database.js";
import Device from "./Device.js";
import Type from "./Type.js";
import User from "./User.js";
import Sensor from "./Sensor.js";
import Actuator from "./Actuator.js";

const db = {};

db.Type = Type(sequelize);
db.User = User(sequelize);
db.Device = Device(sequelize);
db.Sensor = Sensor(sequelize);
db.Actuator = Actuator(sequelize);

db.Device.belongsTo(db.Type, { 
    foreignKey: 'type_id',
    as: 'type' ,
    
});
db.Device.belongsTo(db.User, { foreignKey: 'user_id', as:"user" });
db.Type.hasMany(db.Device,{ foreignKey: 'type_id', as: "devices" });
db.User.hasMany(db.Device,{ foreignKey: 'user_id',as: "devices" });

db.sequelize = sequelize;

db.sync = async () => {
    await sequelize.sync();
    console.log('[DB] All models were synchronized successfully.');
};

export default db;