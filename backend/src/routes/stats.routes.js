const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Payment = require("../models/Payment");
const { fn, col } = require("sequelize");

router.get("/", auth, async (req, res) => {
  const merchantId = req.merchant.id;

  const total = await Payment.count({ where: { merchant_id: merchantId } });
  const success = await Payment.count({
    where: { merchant_id: merchantId, status: "success" }
  });

  const amountRow = await Payment.findOne({
    where: { merchant_id: merchantId, status: "success" },
    attributes: [[fn("SUM", col("amount")), "total_amount"]],
    raw: true
  });

  const total_amount = Number(amountRow.total_amount || 0);

  res.json({
    total_transactions: total,
    successful_transactions: success,
    success_rate: total === 0 ? 0 : Math.round((success / total) * 100),
    total_amount
  });
});

module.exports = router;
