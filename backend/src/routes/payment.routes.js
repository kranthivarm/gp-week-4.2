const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const generateId = require("../utils/idGenerator");
const { validateVPA, luhnCheck, detectNetwork } = require("../services/validation.service");

const delay = ms => new Promise(r => setTimeout(r, ms));

router.post("/", auth, async (req, res) => {
  const { order_id, method, vpa, card } = req.body;

  const order = await Order.findByPk(order_id);
  if (!order) {
    return res.status(404).json({
      error: { code: "NOT_FOUND_ERROR", description: "Order not found" }
    });
  }

  let paymentData = {
    id: generateId("pay"),
    order_id,
    merchant_id: req.merchant.id,
    amount: order.amount,
    currency: order.currency,
    method,
    status: "processing"
  };

  if (method === "upi") {
    if (!validateVPA(vpa)) {
      return res.status(400).json({
        error: { code: "INVALID_VPA", description: "VPA format invalid" }
      });
    }
    paymentData.vpa = vpa;
  }

  if (method === "card") {
    if (!luhnCheck(card.number)) {
      return res.status(400).json({
        error: { code: "INVALID_CARD", description: "Card validation failed" }
      });
    }
    paymentData.card_network = detectNetwork(card.number);
    paymentData.card_last4 = card.number.slice(-4);
  }

  const payment = await Payment.create(paymentData);

  const success = process.env.TEST_MODE === "true"
    ? process.env.TEST_PAYMENT_SUCCESS !== "false"
    : Math.random() < (method === "upi" ? 0.9 : 0.95);

  await delay(process.env.TEST_PROCESSING_DELAY || 6000);

  await payment.update({
    status: success ? "success" : "failed",
    error_code: success ? null : "PAYMENT_FAILED",
    error_description: success ? null : "Payment could not be processed"
  });

  res.status(201).json(payment);
});

router.get("/:id", auth, async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) {
    return res.status(404).json({
      error: { code: "NOT_FOUND_ERROR", description: "Payment not found" }
    });
  }
  res.json(payment);
});

router.post("/public", async (req, res) => {
  const { order_id, method, vpa, card } = req.body;

  const order = await Order.findByPk(order_id);
  if (!order) {
    return res.status(404).json({
      error: { code: "NOT_FOUND_ERROR", description: "Order not found" }
    });
  }

  let paymentData = {
    id: generateId("pay"),
    order_id,
    merchant_id: order.merchant_id,
    amount: order.amount,
    currency: order.currency,
    method,
    status: "processing"
  };

  if (method === "upi") {
    if (!validateVPA(vpa)) {
      return res.status(400).json({
        error: { code: "INVALID_VPA", description: "VPA format invalid" }
      });
    }
    paymentData.vpa = vpa;
  }

  if (method === "card") {
    if (!luhnCheck(card.number)) {
      return res.status(400).json({
        error: { code: "INVALID_CARD", description: "Card validation failed" }
      });
    }
    paymentData.card_network = detectNetwork(card.number);
    paymentData.card_last4 = card.number.slice(-4);
  }

  const payment = await Payment.create(paymentData);

  const success =
    process.env.TEST_MODE === "true"
      ? process.env.TEST_PAYMENT_SUCCESS !== "false"
      : Math.random() < 0.95;

  const delayMs = Number(process.env.TEST_PROCESSING_DELAY || 5000);
  await new Promise(r => setTimeout(r, delayMs));

  await payment.update({
    status: success ? "success" : "failed",
    error_code: success ? null : "PAYMENT_FAILED",
    error_description: success ? null : "Payment failed"
  });

  res.status(201).json(payment);
});


module.exports = router;

