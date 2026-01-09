require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./config/db");
const seedMerchant = require("./seed/seedMerchant");

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedMerchant();

    app.listen(PORT, () =>
      console.log(`API running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
