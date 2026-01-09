const Merchant = require("../models/Merchant");

module.exports = async () => {
  const exists = await Merchant.findOne({
    where: { email: "test@example.com" }
  });

  if (!exists) {
    await Merchant.create({
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Test Merchant",
      email: "test@example.com",
      api_key: "key_test_abc123",
      api_secret: "secret_test_xyz789",
      is_active: true
    });
  }
};
