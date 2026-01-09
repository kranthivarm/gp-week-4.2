const Merchant = require("../models/Merchant");

module.exports = async (req, res, next) => {
  const key = req.header("X-Api-Key");
  const secret = req.header("X-Api-Secret");

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
