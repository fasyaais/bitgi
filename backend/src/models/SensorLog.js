import { DataTypes } from "sequelize";

export default (sequelize) => {
  const actuator = sequelize.define(
    "SensorLog",
    {
      id: {
          type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      device_id: {
          type:DataTypes.STRING,
          allowNull: false
      },
      type : {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      value : {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      raw : {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      tableName: "sensor_logs",
    }
  );
  return actuator;
};
