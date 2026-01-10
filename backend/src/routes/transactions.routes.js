const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Payment = require("../models/Payment");
const { Op } = require("sequelize");

router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "20");
  const offset = (page - 1) * limit;

  const where = { merchant_id: req.merchant.id };

  if (req.query.status) where.status = req.query.status;
  if (req.query.method) where.method = req.query.method;
  if (req.query.order_id) where.order_id = req.query.order_id;

  const { rows, count } = await Payment.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]]
  });

  res.json({
    total: count,
    page,
    limit,
    data: rows.map(p => ({
      id: p.id,
      order_id: p.order_id,
      amount: p.amount,
      currency: p.currency,
      method: p.method,
      status: p.status,
      created_at: p.createdAt
    }))
  });
});

module.exports = router;
