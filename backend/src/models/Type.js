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
                type:DataTypes.STRING(20),
                allowNull: false
            }
        }, {
            tableName:'types'
        }
    )
    return type;
}