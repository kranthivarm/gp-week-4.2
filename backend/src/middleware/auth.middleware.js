const Merchant = require("../models/Merchant");

module.exports = async (req, res, next) => {
  // ✅ Skip auth for public endpoints  
   if (
    req.path.startsWith("/api/v1/orders/") && req.path.endsWith("/public") ||
    req.path === "/api/v1/payments/public" ||
    req.path === "/health" ||
    req.path === "/api/v1/test/merchant"
  ) {
    return next();
  }


  const key = req.header("X-Api-Key");
  const secret = req.header("X-Api-Secret");
  if (!key || !secret) {
    return res.status(401).json({
      error: "API credentials missing"
    });
  }
  const merchant = await Merchant.findOne({
    where: { api_key: key, api_secret: secret }
  });

  if (!merchant) {
    return res.status(401).json({
      error: {
        code: "AUTHENTICATION_ERROR",
        description: "Invalid API credentials"
      }
    });
  }

  req.merchant = merchant;
  next();
};
