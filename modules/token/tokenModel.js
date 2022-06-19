import { DataTypes } from "sequelize";
import { db } from "../../db.js";
import { userModel } from "../user/userModel.js";

export const tokenModel = db.define('Token', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

tokenModel.belongsTo(userModel, {
  foreignKey: 'userId',
  allowNull: false
})
