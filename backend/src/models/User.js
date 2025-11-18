import { DataTypes } from "sequelize";

export default function (sequelize) {
    const user = sequelize.define('User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fullname : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username : {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role : {
                type: DataTypes.STRING,
                defaultValue: "user",
            }
        }, {
            tableName:'users',
        }
    );

    return user;
}