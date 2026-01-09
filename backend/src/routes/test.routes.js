const router = require("express").Router();
const Merchant = require("../models/Merchant");

router.get("/merchant", async (_, res) => {
  const merchant = await Merchant.findOne({
    where: { email: "test@example.com" }
  });

  if (!merchant) return res.sendStatus(404);

  res.json({
    id: merchant.id,
    email: merchant.email,
    api_key: merchant.api_key,
    seeded: true
  });
});

module.exports = router;
