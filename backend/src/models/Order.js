const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define("order", {
  id: { type: DataTypes.STRING, primaryKey: true },
  amount: DataTypes.INTEGER,
  currency: DataTypes.STRING,
  receipt: DataTypes.STRING,
  notes: DataTypes.JSON,
  status: DataTypes.STRING
});

module.exports = Order;
