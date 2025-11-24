import { DataTypes } from "sequelize";

export default function (sequelize) {
    const type = sequelize.define('Type',
        {
            id: {
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type:DataTypes.STRING(50),
                allowNull: false
            },
            actuator: {
                type: DataTypes.JSON(),
                allowNull: true,
                // get() {
                //     const value = this.getDataValue('actuator');
                //     return JSON.parse(value);
                // }
            },
            sensor: {
                type: DataTypes.JSON(),
                allowNull: true,
                // get() {
                //     const value = this.getDataValue('sensor');
                //     return JSON.parse(value);
                // }
            }
        }, {
            tableName:'types'
        }
    )
    return type;
}