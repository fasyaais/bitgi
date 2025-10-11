import { DataTypes } from "sequelize";

export default (sequelize) => {
    const device = sequelize.define('Device',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type : {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_online : {
                type: DataTypes.BOOLEAN,
                defaultValue:false,
                allowNull: false,
            },
            last_seen : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            qr_code : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_seen : {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName:'devices',
        }
    );
    return device;
}