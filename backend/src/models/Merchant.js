const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Merchant = sequelize.define("merchant", {
  id: { type: DataTypes.UUID, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  api_key: { type: DataTypes.STRING, unique: true },
  api_secret: DataTypes.STRING,
  is_active: DataTypes.BOOLEAN
});

module.exports = Merchant;
