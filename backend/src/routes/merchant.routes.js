const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  const m = req.merchant;

  res.json({
    id: m.id,
    name: m.name,
    email: m.email,
    api_key: m.api_key,
    api_secret: m.api_secret,
    webhook_url: m.webhook_url,
    is_active: m.is_active,
    created_at: m.createdAt,
    updated_at: m.updatedAt
  });
});

module.exports = router;
