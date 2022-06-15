import { DataTypes } from "sequelize";
import { db } from "../../db.js";

export const UserModel = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
