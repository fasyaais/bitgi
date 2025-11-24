import { DataTypes } from "sequelize";

export default (sequelize) => {
  const actuator = sequelize.define(
    "Actuator",
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
      topic : {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "actuators",
    }
  );
  return actuator;
};
