const router = require("express").Router();
const { sequelize } = require("../config/db");

router.get("/", async (_, res) => {
  let db = "connected";
  try {
    await sequelize.authenticate();
  } catch {
    db = "disconnected";
  }

  res.json({
    status: "healthy",
    database: db,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
