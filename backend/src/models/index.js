import { sequelize } from "./../config/database.js";
import Device from "./Device.js";
import Type from "./Type.js";
import User from "./User.js";

const db = {};

db.Type = Type(sequelize);
db.User = User(sequelize);
db.Device = Device(sequelize);

db.Device.belongsTo(db.Type, { foreignKey: 'type' });
db.Device.belongsTo(db.User, { foreignKey: 'user_id' });
db.Type.hasMany(db.Device,{ foreignKey: 'type' });
db.User.hasMany(db.Device,{ foreignKey: 'user_id' });

db.sequelize = sequelize;

db.sync = async () => {
    await sequelize.sync();
    console.log('[DB] All models were synchronized successfully.');
};

export default db;