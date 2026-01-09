const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Order = require("../models/Order");
const generateId = require("../utils/idGenerator");

router.post("/", auth, async (req, res) => {
  const { amount, currency = "INR", receipt, notes } = req.body;

  if (!amount || amount < 100) {
    return res.status(400).json({
      error: { code: "BAD_REQUEST_ERROR", description: "amount must be at least 100" }
    });
  }

  const order = await Order.create({
    id: generateId("order"),
    merchant_id: req.merchant.id,
    amount,
    currency,
    receipt,
    notes,
    status: "created"
  });

  res.status(201).json(order);
});

router.get("/:id", auth, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    return res.status(404).json({
      error: { code: "NOT_FOUND_ERROR", description: "Order not found" }
    });
  }
  res.json(order);
});

module.exports = router;
