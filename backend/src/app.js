const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const testRoutes = require("./routes/test.routes");
const merchantRoutes = require("./routes/merchant.routes");
const transactionRoutes = require("./routes/transactions.routes");
const statsRoutes = require("./routes/stats.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/merchant", merchantRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/stats", statsRoutes);






module.exports = app;
