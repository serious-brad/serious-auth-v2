import sequelize from "sequelize";

export const db = new sequelize({
  dialect: 'sqlite',
  storage: 'brad.sqlite'
});
