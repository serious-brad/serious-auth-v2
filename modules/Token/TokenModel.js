import { DataTypes } from "sequelize";
import { db } from "../../db.js";
import { UserModel } from "../User/UserModel.js";

export const TokenModel = db.define('Token', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

TokenModel.belongsTo(UserModel, {
  foreignKey: 'userId'
})
