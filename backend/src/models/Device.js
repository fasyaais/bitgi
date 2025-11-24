import { DataTypes } from "sequelize";

export default (sequelize) => {
  const device = sequelize.define(
    "Device",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      last_seen: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      qr_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "devices",
    }
  );
  return device;
};
