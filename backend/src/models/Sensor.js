import { DataTypes } from "sequelize";

export default (sequelize) => {
  const sensor = sequelize.define(
    "Sensor",
    {
      id: {
          type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
          type:DataTypes.STRING(50),
          allowNull: false
      }
    },
    {
      tableName: "sensors",
    }
  );
  return sensor;
};
