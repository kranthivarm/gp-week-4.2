const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Payment = sequelize.define("payment", {
  id: { type: DataTypes.STRING, primaryKey: true },
  amount: DataTypes.INTEGER,
  currency: DataTypes.STRING,
  method: DataTypes.STRING,
  status: DataTypes.STRING,
  vpa: DataTypes.STRING,
  card_network: DataTypes.STRING,
  card_last4: DataTypes.STRING,
  error_code: DataTypes.STRING,
  error_description: DataTypes.TEXT
});

module.exports = Payment;
